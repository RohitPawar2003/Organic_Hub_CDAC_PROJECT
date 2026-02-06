package com.cdac.modelmvc;

import java.time.LocalDate;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "orderr")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderId;

    @NotNull(message = "required")
    private LocalDate ordersdate = LocalDate.now(); // default to today

    @NotNull(message = "required")
    @ManyToOne
    @JoinColumn(name = "customer_id")
    private User customer;

    @NotNull(message = "required")
    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @NotNull(message = "required")
    private String status = "PLACED"; // default status

    // Getters and setters
    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public LocalDate getOrdersdate() {
        return ordersdate;
    }

    public void setOrdersdate(LocalDate ordersdate) {
        this.ordersdate = ordersdate;
    }

    public User getCustomer() {
        return customer;
    }

    public void setCustomer(User customer) {
        this.customer = customer;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setUser(User user) {
        this.customer = user;
    }
}
