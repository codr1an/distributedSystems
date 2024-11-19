package com.ecommerce.valdivian.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class OrderItemDTO {

    private Long id;
    private Long productId;
    private String productName;
    private double productPrice;
    private String productDescription;
    private String productType;
    private String productImageUrl;
    private int quantity;
}