package com.ecommerce.valdivian.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Data
@Entity
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnoreProperties({"name", "password", "email", "address", "role"})
    private User user;

    @OneToMany(cascade = CascadeType.ALL)
    private List<CartItem> items = new ArrayList<>();

    private double totalCartPrice = 0.0;

    public void addItem(CartItem item) {
        this.items.add(item);
        this.totalCartPrice += item.getTotalPrice();
    }

    public void removeItem(CartItem item) {
        this.items.remove(item);
        this.totalCartPrice -= item.getTotalPrice();
    }

    public void clearCart() {
        this.items.clear();
        this.totalCartPrice = 0;
    }

    public CartItem findItemByProduct(Product product) {
        return this.items.stream()
                .filter(cartItem -> cartItem.getProduct().equals(product))
                .findFirst()
                .orElse(null);
    }

    public void updateTotalPrice() {
        this.totalCartPrice = items.stream()
                .mapToDouble(item -> item.getProduct().getPrice() * item.getQuantity())
                .sum();
    }
}