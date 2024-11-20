package com.ecommerce.valdivian.repository;

import com.ecommerce.valdivian.model.Cart;
import com.ecommerce.valdivian.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart, Long> {
    Optional<Cart> findByUser(User user);
}
