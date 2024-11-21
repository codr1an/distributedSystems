package com.ecommerce.valdivian.controller;

import com.ecommerce.valdivian.model.Product;
import com.ecommerce.valdivian.model.ProductSpecifications;
import com.ecommerce.valdivian.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    @GetMapping
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @GetMapping("/filter")
    public List<Product> getFilteredProducts(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String brand,
            @RequestParam(required = false) Integer modelYear,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String sortField,
            @RequestParam(defaultValue = "asc") String sortOrder) {

        Sort.Direction direction = Sort.Direction.fromString(sortOrder.toUpperCase());
        String sortBy = (sortField != null) ? sortField : "id";
        Sort sort = Sort.by(direction, sortBy);

        Specification<Product> specification = Specification
                .where(ProductSpecifications.hasBrand(brand))
                .and(ProductSpecifications.hasCategory(category))
                .and(ProductSpecifications.hasModelYear(modelYear))
                .and(ProductSpecifications.hasPriceBetween(minPrice, maxPrice))
                .and(ProductSpecifications.hasSearchKeyword(search));

        return productRepository.findAll(specification, sort);
    }

    @GetMapping("/{id}")
    public Optional<Product> getProductById(@PathVariable Long id) {
        return productRepository.findById(id);
    }

    @GetMapping("/type/{category}")
    public List<Product> getProductsByCategory(@PathVariable String category) {
        return productRepository.findByCategory(category);
    }

    @PreAuthorize("hasRole('admin')")
    @PostMapping
    public Product addProduct(@RequestBody Product product) {
        return productRepository.save(product);
    }

    @PreAuthorize("hasRole('admin')")
    @PutMapping("/{id}")
    public Product updateProduct(@PathVariable Long id, @RequestBody Product updatedProduct) {
        return productRepository.findById(id)
                .map(product -> {
                    product.setName(updatedProduct.getName());
                    product.setPrice(updatedProduct.getPrice());
                    product.setDescription(updatedProduct.getDescription());
                    product.setImageUrl(updatedProduct.getImageUrl());
                    return productRepository.save(product);
                })
                .orElseThrow(() -> new RuntimeException("Product not found with id " + id));
    }

    @PreAuthorize("hasRole('admin')")
    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Long id) {
        productRepository.deleteById(id);
    }
}
