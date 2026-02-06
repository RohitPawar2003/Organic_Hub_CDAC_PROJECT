package com.cdac.controller;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import com.cdac.modelmvc.Order;
import com.cdac.modelmvc.Product;
import com.cdac.modelmvc.User;
import com.cdac.repository.OrderRepository;
import com.cdac.repository.ProductsRepository;
import com.cdac.repository.UserRepository;

@RestController
@RequestMapping("/order")
@CrossOrigin(origins = "http://localhost:5173")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductsRepository productRepository;

    // ✅ PLACE ORDER
    @PostMapping("/place")
    public ResponseEntity<?> placeOrder(
            @RequestParam Long productId,
            @AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepository.findByEmail(userDetails.getUsername());
        if (user == null) {
            throw new RuntimeException("User not found");
        }

        Product product = productRepository
                .findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        if (product.getStock() <= 0) {
            return ResponseEntity.badRequest().body("Out of stock");
        }

        Order order = new Order();
        order.setCustomer(user);
        order.setProduct(product);
        order.setStatus("PLACED");
        order.setOrdersdate(LocalDate.now());

        product.setStock(product.getStock() - 1);

        Order savedOrder = orderRepository.save(order);
        productRepository.save(product);

        Map<String, Object> response = new HashMap<>();
        response.put("orderId", savedOrder.getOrderId());
        response.put("status", "PLACED");

        return ResponseEntity.ok(response);
    }

    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN')")
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @PatchMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SHOPKEEPER')")
    public ResponseEntity<?> updateOrderStatus(@PathVariable Long id, @RequestParam String status) {
        Order order = orderRepository.findById(id).orElseThrow(() -> new RuntimeException("Order not found"));
        order.setStatus(status);
        orderRepository.save(order);
        return ResponseEntity.ok("Order status updated");
    }

}