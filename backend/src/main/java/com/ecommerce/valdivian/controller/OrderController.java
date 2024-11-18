package com.ecommerce.valdivian.controller;
import com.ecommerce.valdivian.model.Order;
import com.ecommerce.valdivian.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/orders")
public class OrderController {
    private final OrderRepository orderRepository;

    @GetMapping
    List<Order> all(){
        return orderRepository.findAll();
    }

    @PostMapping
    Order order (@RequestBody Order order){
        return orderRepository.save(order);
    }

    @GetMapping("/{id}")
    Optional<Order> id(@PathVariable Long id){
        return orderRepository.findById(id);
    }

    @DeleteMapping("/{id}")
    void deleteOrder(@PathVariable Long id){
        orderRepository.deleteById(id);
    }

    @PutMapping("/{id}")
    Order updateOrder(@RequestBody Order updateOrder, @PathVariable Long id){
        return orderRepository.findById(id)
                .map(order ->{
                    order.setStatus(updateOrder.getStatus());
                    return  orderRepository.save(order);
                })
                .orElseThrow(() -> new RuntimeException("Order not found with found with id: " + id));
    }

}
