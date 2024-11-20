package com.ecommerce.valdivian.service;

import com.ecommerce.valdivian.model.Cart;
import com.ecommerce.valdivian.model.Order;
import com.ecommerce.valdivian.model.User;
import com.ecommerce.valdivian.repository.CartRepository;
import com.ecommerce.valdivian.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final CartRepository cartRepository;

    @Transactional
    public Order placeOrder(User user) {
        Cart cart = cartRepository.findByUser(user).orElseThrow(() -> new IllegalArgumentException("Cart not found"));

        if (cart.getItems().isEmpty()) {
            throw new IllegalStateException("You can't place an order with an empty cart");
        }

        Order order = new Order(user, cart.getItems(), cart.getTotalCartPrice());
        cart.clearCart();
        cartRepository.save(cart);
        return orderRepository.save(order);
    }

    public List<Order> getUserOrders(User user) {
        return orderRepository.findByUser(user);
    }

    public Order getOrderById(User user, Long orderId) {
        Order order = orderRepository.findById(orderId).orElseThrow(() -> new IllegalArgumentException("Order not found"));
        if (!order.getUser().equals(user)) {
            throw new IllegalArgumentException("Access denied to this order");
        }
        return order;
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @Transactional
    public Order updateOrderStatus(Long orderId, String status) {
        Order order = orderRepository.findById(orderId).orElseThrow(() -> new IllegalArgumentException("Order not found"));
        order.setStatus(status);
        return orderRepository.save(order);
    }
}
