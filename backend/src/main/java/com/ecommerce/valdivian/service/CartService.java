package com.ecommerce.valdivian.service;

import com.ecommerce.valdivian.model.Cart;
import com.ecommerce.valdivian.model.CartItem;
import com.ecommerce.valdivian.model.Product;
import com.ecommerce.valdivian.model.User;
import com.ecommerce.valdivian.repository.CartRepository;
import com.ecommerce.valdivian.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartRepository;
    private final ProductRepository productRepository;

    public Cart getCart(User user) {
        return cartRepository.findByUser(user).orElseGet(() -> createEmptyCart(user));
    }

    public Cart addProductToCart(User user, Long productId) {
        Cart cart = getCart(user);
        Optional<Product> optionalProduct = productRepository.findById(productId);

        if (optionalProduct.isPresent()) {
            Product product = optionalProduct.get();
            CartItem cartItem = cart.findItemByProduct(product);

            if (cartItem == null) {
                cart.addItem(new CartItem(product));
            } else {
                cartItem.increaseQuantity();
            }
            cart.updateTotalPrice();
            return cartRepository.save(cart);

        }
        cart.updateTotalPrice();
        return cart;
    }

    public Cart updateProductQuantity(User user, Long productId, int quantity) {
        Cart cart = getCart(user);
        Optional<Product> optionalProduct = productRepository.findById(productId);

        if (optionalProduct.isPresent()) {
            Product product = optionalProduct.get();
            CartItem cartItem = cart.findItemByProduct(product);

            if (cartItem != null) {
                if (quantity > 0) {
                    cartItem.setQuantity(quantity);
                    cartItem.setTotalPrice(cartItem.getProduct().getPrice() * quantity);
                    cart.updateTotalPrice();
                } else {
                    throw new IllegalArgumentException("Quantity must be greater than zero.");
                }
                return cartRepository.save(cart);
            }
        }
        return cart;
    }

    public Cart removeProductFromCart(User user, Long productId) {
        Cart cart = getCart(user);
        Optional<Product> optionalProduct = productRepository.findById(productId);

        if (optionalProduct.isPresent()) {
            Product product = optionalProduct.get();
            CartItem cartItem = cart.findItemByProduct(product);

            if (cartItem != null) {
                cart.removeItem(cartItem);
                cartRepository.save(cart);
            }
        }
        cart.updateTotalPrice();
        return cart;
    }

    public void clearCart(User user) {
        Cart cart = getCart(user);
        cart.clearCart();
        cartRepository.save(cart);
    }

    private Cart createEmptyCart(User user) {
        Cart cart = new Cart();
        cart.setUser(user);
        return cartRepository.save(cart);
    }
}
