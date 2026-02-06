package com.cdac.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.cdac.modelmvc.Order;
import com.cdac.repository.OrderRepository;
import com.cdac.repository.UserRepository;
import com.cdac.modelmvc.User;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;

@RestController
@RequestMapping("/customer")
@CrossOrigin(origins = "http://localhost:5173")
public class CustomerController {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @PreAuthorize("hasRole('CUSTOMER')")
    @PostMapping("/placeOrder")
    public Order placeOrder(@RequestBody Order order) {
        return orderRepository.save(order);
    }

    @GetMapping("/orders")
    public List<Order> getAllOrders(@AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepository.findByEmail(userDetails.getUsername());
        return orderRepository.findByCustomer_Id(user.getId());
    }
}
