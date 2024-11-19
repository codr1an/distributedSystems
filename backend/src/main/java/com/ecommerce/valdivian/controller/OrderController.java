package com.ecommerce.valdivian.controller;
import com.ecommerce.valdivian.dto.OrderDTO;
import com.ecommerce.valdivian.dto.OrderItemDTO;
import com.ecommerce.valdivian.dto.OrderStatusUpdateDTO;
import com.ecommerce.valdivian.model.Cart;
import com.ecommerce.valdivian.model.Order;
import com.ecommerce.valdivian.model.OrderItem;
import com.ecommerce.valdivian.model.User;
import com.ecommerce.valdivian.repository.CartRepository;
import com.ecommerce.valdivian.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderRepository orderRepository;
    private final CartRepository cartRepository;


    @PostMapping
    public ResponseEntity<OrderDTO> addOrder(@AuthenticationPrincipal User user) {
        Optional<Cart> cartOpt = cartRepository.findByUser(user);
        if (cartOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        Cart cart = cartOpt.get();
        if (cart.getItems().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }

        Order order = new Order();
        order.setUser(user);
        order.setOrderItems(cart.getItems().stream().map(item -> {
            OrderItem orderItem = new OrderItem();
            orderItem.setProduct(item.getProduct());
            orderItem.setQuantity(item.getQuantity());
            orderItem.setOrder(order);
            return orderItem;
        }).collect(Collectors.toList()));

        order.setTotalPrice(cart.getTotalPrice());
        order.setDate(LocalDateTime.now());
        order.setStatus("ordered");
        orderRepository.save(order);

        cart.getItems().clear();
        cart.updateTotalPrice();
        cartRepository.save(cart);

        OrderDTO orderDTO = convertToDTO(order);
        return ResponseEntity.status(HttpStatus.CREATED).body(orderDTO);
    }

    @DeleteMapping("/{orderId}")
    public ResponseEntity<Void> deleteOrder(@AuthenticationPrincipal User user, @PathVariable Long orderId) {
        Optional<Order> orderOpt = orderRepository.findById(orderId);
        if (orderOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        Order order = orderOpt.get();
        if (!order.getUser().equals(user)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        orderRepository.delete(order);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<OrderDTO>> getOrdersForCurrentUser(@AuthenticationPrincipal User user) {
        List<Order> orders = orderRepository.findByUser(user);
        List<OrderDTO> orderDTOs = orders.stream().map(this::convertToDTO).collect(Collectors.toList());
        return ResponseEntity.ok(orderDTOs);
    }

    @PreAuthorize("hasRole('admin')")
    @GetMapping("/all")
    public ResponseEntity<List<OrderDTO>> getOrdersForAllUsers() {
        List<Order> orders = orderRepository.findAll();
        List<OrderDTO> orderDTOs = orders.stream().map(this::convertToDTO).collect(Collectors.toList());
        return ResponseEntity.ok(orderDTOs);
    }

    @PreAuthorize("hasRole('admin')")
    @PutMapping("/{orderId}/status")
    public ResponseEntity<OrderDTO> updateOrderStatus(
            @PathVariable Long orderId,
            @RequestBody OrderStatusUpdateDTO statusUpdateDTO) {

        Optional<Order> orderOpt = orderRepository.findById(orderId);
        if (orderOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        Order order = orderOpt.get();
        order.setStatus(statusUpdateDTO.getStatus());
        orderRepository.save(order);

        OrderDTO orderDTO = convertToDTO(order);
        return ResponseEntity.ok(orderDTO);
    }

    private OrderDTO convertToDTO(Order order) {
        OrderDTO orderDTO = new OrderDTO();
        orderDTO.setId(order.getId());
        orderDTO.setName(order.getUser().getName());
        orderDTO.setAddress(order.getUser().getAddress());
        orderDTO.setTotalPrice(order.getTotalPrice());
        orderDTO.setDate(order.getDate());
        orderDTO.setOrderItems(order.getOrderItems().stream().map(this::convertToDTO).collect(Collectors.toList()));
        orderDTO.setStatus(order.getStatus());
        return orderDTO;
    }

    private OrderItemDTO convertToDTO(OrderItem orderItem) {
        OrderItemDTO orderItemDTO = new OrderItemDTO();
        orderItemDTO.setId(orderItem.getId());
        orderItemDTO.setProductId(orderItem.getProduct().getId());
        orderItemDTO.setProductName(orderItem.getProduct().getName());
        orderItemDTO.setProductPrice(orderItem.getProduct().getPrice());
        orderItemDTO.setProductDescription(orderItem.getProduct().getDescription());
        orderItemDTO.setProductType(orderItem.getProduct().getCategory());
        orderItemDTO.setProductImageUrl(orderItem.getProduct().getImageUrl());
        orderItemDTO.setQuantity(orderItem.getQuantity());
        return orderItemDTO;
    }
}
