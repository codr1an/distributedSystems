package com.ecommerce.valdivian.repository;

import com.ecommerce.valdivian.model.Product;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByCategory(String category);
    List<Product> findByCategory(String category, Sort sort);
    List<Product> findAll(Sort sort);
    List<Product> findByBrand(String brand);
    List<Product> findByModelYear(int modelYear);
    List<Product> findByPriceBetween(double minPrice, double maxPrice);
    List<Product> findByNameContaining(String search, Sort sort);

    @Query("SELECT p FROM Product p WHERE " +
            "LOWER(p.name) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
            "LOWER(p.category) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
            "LOWER(p.brand) LIKE LOWER(CONCAT('%', :search, '%'))")
    List<Product> searchProductsByKeyword(String search, Sort sort);
}
