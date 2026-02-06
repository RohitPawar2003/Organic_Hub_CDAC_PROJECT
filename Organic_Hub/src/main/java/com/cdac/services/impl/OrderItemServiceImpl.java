package com.cdac.services.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cdac.dto.OrderItemDto;
import com.cdac.modelmvc.Order;
import com.cdac.modelmvc.OrderItem;
import com.cdac.modelmvc.Product;
import com.cdac.repository.OrderItemsRepository;
import com.cdac.repository.OrderRepository;
import com.cdac.repository.ProductsRepository;
import com.cdac.services.OrderItemService;

@Service
public class OrderItemServiceImpl implements OrderItemService {

    @Autowired
    private OrderItemsRepository orderItemRepository;

    @Autowired
    private ProductsRepository productRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Override
    public OrderItemDto addOrderItem(OrderItemDto dto) {

        Order order = orderRepository.findById(dto.getOrderItemId())
                .orElseThrow(() -> new RuntimeException("Order not found"));

        Product product = productRepository.findById(dto.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        OrderItem orderItem = new OrderItem();
        orderItem.setOrder(order);
        orderItem.setProduct(product);
        orderItem.setQuantity(dto.getQuantity());
        orderItem.setPrice(dto.getPrice());

        OrderItem saved = orderItemRepository.save(orderItem);
        dto.setOrderItemId(saved.getOrderItemId());

        return dto;
    }

    @Override
    public List<OrderItemDto> getOrderItemsByOrderId(Long orderId) {
        return orderItemRepository.findByOrderOrderId(orderId).stream().map(item -> {
            OrderItemDto dto = new OrderItemDto();
            dto.setOrderItemId(item.getOrderItemId());
            dto.setProductId(item.getProduct().getProductId());
            dto.setProductName(item.getProduct().getProductsname());
            dto.setQuantity(item.getQuantity());
            dto.setPrice(item.getPrice());
            return dto;
        }).collect(Collectors.toList());
    }

    @Override
    public void deleteOrderItem(Long orderItemId) {
        orderItemRepository.deleteById(orderItemId);
    }
}
