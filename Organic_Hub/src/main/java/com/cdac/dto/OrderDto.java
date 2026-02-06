package com.cdac.dto;

import java.time.LocalDate;
import java.util.List;

public class OrderDto {

    private Long orderId;
    private LocalDate ordersdate;
    private String status;

    private Long customerId;
    private String customerName;

    private List<OrderItemDto> orderItems;

    private Double totalAmount;

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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public List<OrderItemDto> getOrderItems() {
        return orderItems;
    }

    public void setOrderItems(List<OrderItemDto> orderItems) {
        this.orderItems = orderItems;
    }

    public Double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(Double totalAmount) {
        this.totalAmount = totalAmount;
    }
}
