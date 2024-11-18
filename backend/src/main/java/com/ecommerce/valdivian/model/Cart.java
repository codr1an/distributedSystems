package com.ecommerce.valdivian.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@Data
@Entity
public class Cart {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    private User user;
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CartItem> items;
    private double totalPrice;
}
