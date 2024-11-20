package com.ecommerce.valdivian.controller;

import com.ecommerce.valdivian.model.Cart;
import com.ecommerce.valdivian.model.Order;
import com.ecommerce.valdivian.model.User;
import com.ecommerce.valdivian.repository.CartRepository;
import com.ecommerce.valdivian.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;
    private final CartRepository cartRepository;

    @GetMapping
    public List<Order> getUserOrders(@AuthenticationPrincipal User user) {
        return orderService.getUserOrders(user);
    }

    @GetMapping("/{orderId}")
    public Order getOrderById(@AuthenticationPrincipal User user, @PathVariable Long orderId) {
        return orderService.getOrderById(user, orderId);
    }

    @PostMapping
    public Order placeOrder(@AuthenticationPrincipal User user) {
        Cart cart = cartRepository.findByUser(user).orElseThrow(() -> new IllegalArgumentException("Cart not found"));

        return orderService.placeOrder(user);
    }

    @PreAuthorize("hasRole('admin')")
    @GetMapping("/bulk")
    public List<Order> getAllOrders() {
        return orderService.getAllOrders();
    }

    @PreAuthorize("hasRole('admin')")
    @PutMapping("/{orderId}")
    public Order updateOrderStatus(@PathVariable Long orderId, @RequestParam String status) {
        return orderService.updateOrderStatus(orderId, status);
    }
}
