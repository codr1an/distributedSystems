package com.ecommerce.valdivian.model;

import com.ecommerce.valdivian.model.Product;
import org.springframework.data.jpa.domain.Specification;

public class ProductSpecifications {

    public static Specification<Product> hasBrand(String brand) {
        return (root, query, criteriaBuilder) ->
                brand == null ? null : criteriaBuilder.equal(root.get("brand"), brand);
    }

    public static Specification<Product> hasCategory(String category) {
        return (root, query, criteriaBuilder) ->
                category == null ? null : criteriaBuilder.equal(root.get("category"), category);
    }

    public static Specification<Product> hasModelYear(Integer modelYear) {
        return (root, query, criteriaBuilder) ->
                modelYear == null ? null : criteriaBuilder.equal(root.get("modelYear"), modelYear);
    }

    public static Specification<Product> hasPriceBetween(Double minPrice, Double maxPrice) {
        return (root, query, criteriaBuilder) -> {
            if (minPrice != null && maxPrice != null) {
                return criteriaBuilder.between(root.get("price"), minPrice, maxPrice);
            } else if (minPrice != null) {
                return criteriaBuilder.greaterThanOrEqualTo(root.get("price"), minPrice);
            } else if (maxPrice != null) {
                return criteriaBuilder.lessThanOrEqualTo(root.get("price"), maxPrice);
            }
            return null;
        };
    }

    public static Specification<Product> hasSearchKeyword(String search) {
        return (root, query, criteriaBuilder) -> {
            if (search == null || search.isEmpty()) {
                return null;
            }
            String likePattern = "%" + search.toLowerCase() + "%";
            return criteriaBuilder.or(
                    criteriaBuilder.like(criteriaBuilder.lower(root.get("name")), likePattern),
                    criteriaBuilder.like(criteriaBuilder.lower(root.get("category")), likePattern),
                    criteriaBuilder.like(criteriaBuilder.lower(root.get("brand")), likePattern)
            );
        };
    }
}
