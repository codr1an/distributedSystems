package com.ecommerce.valdivian.controller;

import com.ecommerce.valdivian.dto.AddItemRequest;
import com.ecommerce.valdivian.dto.RemoveItemRequest;
import com.ecommerce.valdivian.dto.UpdateItemQuantityRequest;
import com.ecommerce.valdivian.model.Cart;
import com.ecommerce.valdivian.model.CartItem;
import com.ecommerce.valdivian.model.Product;
import com.ecommerce.valdivian.model.User;
import com.ecommerce.valdivian.repository.CartRepository;
import com.ecommerce.valdivian.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/carts")
public class CartController {
    private final CartRepository cartRepository;
    private final ProductRepository productRepository;

    @GetMapping
    public ResponseEntity<Cart> getCart(@AuthenticationPrincipal User user) {
        Optional<Cart> cartOpt = cartRepository.findByUser(user);
        if (cartOpt.isEmpty()) {
            Cart cart = new Cart();
            cart.setUser(user);
            cartRepository.save(cart);
            return ResponseEntity.ok(cart);
        }
        Cart cart = cartOpt.get();
        cart.updateTotalPrice();
        return ResponseEntity.ok(cart);
    }

    @PostMapping("/add")
    public ResponseEntity<Cart> addItemToCart(@AuthenticationPrincipal User user, @RequestBody AddItemRequest addItemRequest) {
        Optional<Product> productOpt = productRepository.findById(addItemRequest.getProductId());
        if (productOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        Product product = productOpt.get();
        Cart cart = cartRepository.findByUser(user).orElseGet(() -> {
            Cart newCart = new Cart();
            newCart.setUser(user);
            return cartRepository.save(newCart);
        });

        CartItem cartItem = new CartItem();
        cartItem.setProduct(product);
        cartItem.setQuantity(addItemRequest.getQuantity());

        cart.getItems().add(cartItem);
        cart.updateTotalPrice();
        cartRepository.save(cart);

        return ResponseEntity.ok(cart);
    }

    @PutMapping("/update")
    public ResponseEntity<Cart> updateCartItemQuantity(@AuthenticationPrincipal User user, @RequestBody UpdateItemQuantityRequest updateItemQuantityRequest) {
        Cart cart = cartRepository.findByUser(user).orElse(null);
        if (cart == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        Optional<CartItem> cartItemOpt = cart.getItems().stream()
                .filter(item -> item.getId().equals(updateItemQuantityRequest.getItemId()))
                .findFirst();

        if (cartItemOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        CartItem cartItem = cartItemOpt.get();
        int newQuantity = updateItemQuantityRequest.getQuantity();

        if (newQuantity > 0) {
            cartItem.setQuantity(newQuantity);
        } else {
            cart.getItems().remove(cartItem);
        }

        cart.updateTotalPrice();
        cartRepository.save(cart);

        return ResponseEntity.ok(cart);
    }

    @DeleteMapping("/remove")
    public ResponseEntity<Void> removeItemFromCart(@AuthenticationPrincipal User user, @RequestBody RemoveItemRequest removeItemRequest) {
        Cart cart = cartRepository.findByUser(user).orElse(null);
        if (cart == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        cart.getItems().removeIf(item -> item.getId().equals(removeItemRequest.getItemId()));
        cart.updateTotalPrice();
        cartRepository.save(cart);

        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/clear")
    public ResponseEntity<Void> clearCart(@AuthenticationPrincipal User user) {
        Cart cart = cartRepository.findByUser(user).orElse(null);
        if (cart == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        cart.getItems().clear();
        cart.updateTotalPrice();
        cartRepository.save(cart);

        return ResponseEntity.noContent().build();
    }

}
