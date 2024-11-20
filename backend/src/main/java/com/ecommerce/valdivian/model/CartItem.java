package com.ecommerce.valdivian.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
@Entity
public class CartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "product_id")
    @JsonIgnoreProperties({"description", "imageUrl", "category"})
    private Product product;

    private int quantity;

    private double totalPrice = 0.0;

    public CartItem(Product product) {
        this.product = product;
        this.quantity = 1;
        this.totalPrice = product.getPrice();
    }

    public void increaseQuantity() {
        this.quantity++;
        this.totalPrice = this.product.getPrice() * this.quantity;
    }


}