package com.ecommerce.valdivian.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AddItemRequest {
    private Long productId;
    private int quantity;
}
