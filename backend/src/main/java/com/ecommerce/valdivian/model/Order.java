package com.ecommerce.valdivian.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Data
@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnoreProperties({"password", "email", "role"})
    private User user;

    @OneToMany(cascade = CascadeType.ALL)
    private List<CartItem> items = new ArrayList<>();

    private double totalPrice;

    private LocalDateTime date;

    private String status = "Pending";

    public Order(User user, List<CartItem> items, double totalPrice) {
        this.user = user;
        this.items = new ArrayList<>(items);
        this.totalPrice = totalPrice;
        this.date = LocalDateTime.now();
    }
}
