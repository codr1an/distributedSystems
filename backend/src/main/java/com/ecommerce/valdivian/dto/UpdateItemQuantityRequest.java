package com.ecommerce.valdivian.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UpdateItemQuantityRequest {
    private Long itemId;
    private int quantity;
}
