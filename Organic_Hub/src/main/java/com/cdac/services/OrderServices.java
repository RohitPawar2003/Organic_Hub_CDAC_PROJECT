package com.cdac.services;

import java.util.List;

import com.cdac.modelmvc.Order;

public interface OrderServices {
	Order placeOrder(Order order);

	List<Order> getAllOrders();

	List<Order> getOrdersByCustomer(Long customerId);

	Order updateOrderStatus(Long orderId, String status);
}
