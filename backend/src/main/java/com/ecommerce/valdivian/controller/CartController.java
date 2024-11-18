package com.ecommerce.valdivian.controller;

import com.ecommerce.valdivian.model.Cart;
import com.ecommerce.valdivian.repository.CartRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/carts")
public class CartController {
    private final CartRepository cartRepository;

    @GetMapping
    List<Cart> all() {
        return cartRepository.findAll();
    }

    @PostMapping
    Cart createCart(@RequestBody Cart newCart) {
        return cartRepository.save(newCart);
    }

    @GetMapping("/{id}")
    Optional<Cart> getCartById(@PathVariable Long id) {
        return cartRepository.findById(id);
    }

    @PutMapping("/{id}")
    Cart updateCart(@RequestBody Cart updatedCart, @PathVariable Long id) {
        return cartRepository.findById(id)
                .map(cart -> {
                    cart.setItems(updatedCart.getItems());
                    return cartRepository.save(cart);
                })
                .orElseThrow(() -> new RuntimeException("Cart not found with id: " + id));
    }

    @DeleteMapping("/{id}")
    void deleteCart(@PathVariable Long id) {
        cartRepository.deleteById(id);
    }
}
