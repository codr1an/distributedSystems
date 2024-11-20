package com.ecommerce.valdivian.repository;

import com.ecommerce.valdivian.model.Order;
import com.ecommerce.valdivian.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUser(User user);
}
