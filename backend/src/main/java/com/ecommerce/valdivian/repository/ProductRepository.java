package com.ecommerce.valdivian.repository;

import com.ecommerce.valdivian.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
