package com.ecommerce.valdivian.controller;


import com.ecommerce.valdivian.model.Product;
import com.ecommerce.valdivian.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class ProductController {
    private final ProductRepository productRepository;


    @GetMapping("/api/products")
    List<Product> all(){
        return productRepository.findAll();
    }

    @PostMapping("/api/products")
    Product product (@RequestBody Product newProduct){
        return productRepository.save(newProduct);
    }

    @GetMapping("/api/products/{id}")
    Optional<Product> id(@PathVariable Long id){
        return productRepository.findById(id);
    }

    @DeleteMapping("/api/products/{id}")
    void deleteProduct(@PathVariable Long id){
        productRepository.deleteById(id);
    }
}
