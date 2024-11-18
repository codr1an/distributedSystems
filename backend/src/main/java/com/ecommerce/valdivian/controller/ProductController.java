package com.ecommerce.valdivian.controller;


import com.ecommerce.valdivian.model.Product;
import com.ecommerce.valdivian.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/products")
public class ProductController {
    private final ProductRepository productRepository;


    @GetMapping
    List<Product> all(){
        return productRepository.findAll();
    }

    @PostMapping
    Product product (@RequestBody Product newProduct){
        return productRepository.save(newProduct);
    }

    @GetMapping("/{id}")
    Optional<Product> id(@PathVariable Long id){
        return productRepository.findById(id);
    }

    @DeleteMapping("/{id}")
    void deleteProduct(@PathVariable Long id){
        productRepository.deleteById(id);
    }

    @PutMapping("/{id}")
    Product updateProduct(@RequestBody Product updatedProduct, @PathVariable Long id) {
        return productRepository.findById(id)
                .map(product -> {
                    product.setName(updatedProduct.getName());
                    product.setCategory(updatedProduct.getCategory());
                    product.setPrice(updatedProduct.getPrice());
                    product.setImageUrl(updatedProduct.getImageUrl());
                    return productRepository.save(product);
                })
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
    }
}
