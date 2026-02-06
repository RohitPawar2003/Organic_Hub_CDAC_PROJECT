package com.cdac.services.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cdac.modelmvc.Order;
import com.cdac.repository.OrderRepository;
import com.cdac.services.OrderServices;

@Service
public class OrderServiceImpl implements OrderServices {

	@Autowired
	private OrderRepository orderRepository;

	@Override
	public Order placeOrder(Order order) {
		return orderRepository.save(order);
	}

	@Override
	public List<Order> getAllOrders() {
		return orderRepository.findAll();
	}

	@Override
	public List<Order> getOrdersByCustomer(Long customerId) {
		return orderRepository.findByCustomer_Id(customerId);
	}

	@Override
	public Order updateOrderStatus(Long orderId, String status) {
		Order order = orderRepository.findById(orderId).orElseThrow(() -> new RuntimeException("Order not found"));
		order.setStatus(status);
		return orderRepository.save(order);
	}

}
