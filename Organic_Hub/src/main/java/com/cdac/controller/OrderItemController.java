package com.cdac.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.cdac.dto.OrderItemDto;
import com.cdac.services.OrderItemService;

@RestController
@RequestMapping("/orderitems")
@CrossOrigin(origins = "http://localhost:5173")
public class OrderItemController {

    @Autowired
    private OrderItemService orderItemService;

    @PostMapping
    public OrderItemDto addOrderItem(@RequestBody OrderItemDto dto) {
        return orderItemService.addOrderItem(dto);
    }

    @GetMapping("/order/{orderId}")
    public List<OrderItemDto> getItemsByOrder(@PathVariable Long orderId) {
        return orderItemService.getOrderItemsByOrderId(orderId);
    }

    @DeleteMapping("/{id}")
    public void deleteOrderItem(@PathVariable Long id) {
        orderItemService.deleteOrderItem(id);
    }
}
