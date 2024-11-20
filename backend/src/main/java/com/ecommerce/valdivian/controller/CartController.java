package com.ecommerce.valdivian.controller;

import com.ecommerce.valdivian.model.Cart;
import com.ecommerce.valdivian.model.User;
import com.ecommerce.valdivian.repository.CartRepository;
import com.ecommerce.valdivian.repository.ProductRepository;
import com.ecommerce.valdivian.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/cart")
public class CartController {

    private final CartRepository cartRepository;
    private final ProductRepository productRepository;
    private final CartService cartService;

    @GetMapping
    public Cart getCart(@AuthenticationPrincipal User user) {
        return cartService.getCart(user);
    }

    @PostMapping("/product/{productId}")
    public Cart addProductToCart(@AuthenticationPrincipal User user, @PathVariable Long productId) {
        return cartService.addProductToCart(user, productId);
    }

    @PutMapping("/product/{productId}")
    public Cart updateProductQuantity(@AuthenticationPrincipal User user, @PathVariable Long productId, @RequestParam int quantity) {
        return cartService.updateProductQuantity(user, productId, quantity);
    }

    @DeleteMapping("/product/{productId}")
    public Cart removeProductFromCart(@AuthenticationPrincipal User user, @PathVariable Long productId) {
        return cartService.removeProductFromCart(user, productId);
    }

    @DeleteMapping("/clear")
    public void clearCart(@AuthenticationPrincipal User user) {
        cartService.clearCart(user);
    }
}