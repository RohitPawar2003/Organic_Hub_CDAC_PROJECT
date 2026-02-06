package com.cdac.services;

import java.util.List;

import com.cdac.dto.OrderItemDto;

public interface OrderItemService {

    OrderItemDto addOrderItem(OrderItemDto dto);
    List<OrderItemDto> getOrderItemsByOrderId(Long orderId);
    void deleteOrderItem(Long orderItemId);
}
