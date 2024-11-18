package com.ecommerce.valdivian.model;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;
import java.util.List;

@NoArgsConstructor
@Data
@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    private User user;
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CartItem> items;
    @Temporal(TemporalType.DATE)
    private Date date;
    private String status;
    private double totalPrice;

}
