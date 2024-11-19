package com.ecommerce.valdivian.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@NoArgsConstructor
@Data
public class OrderDTO {
    private Long id;
    private List<OrderItemDTO> orderItems;
    private double totalPrice;
    private LocalDateTime date;
    private String name;
    private String address;
    private String status;
}