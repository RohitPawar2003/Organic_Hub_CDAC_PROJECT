package com.cdac.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;

import com.cdac.modelmvc.Payment;
import com.cdac.repository.PaymentsRepository;

@RestController
@RequestMapping("/payment")
@CrossOrigin(origins = "http://localhost:5173")
public class PaymentsController {

    @Autowired
    private PaymentsRepository paymentRepository;

    @PostMapping("/pay")
    public Payment makePayment(@RequestBody Payment payment) {
        return paymentRepository.save(payment);
    }

    @GetMapping("/seller")
    @PreAuthorize("hasRole('SHOPKEEPER')")
    public java.util.List<Payment> getSellerPayments(
            @AuthenticationPrincipal org.springframework.security.core.userdetails.UserDetails userDetails) {
        // This requires complex query or filtering.
        // Simplest: Find all payments, filter in Java stream where
        // payment.order.product.seller.email == userDetails.username
        // Not efficient for large data but fine for mvp
        return paymentRepository.findAll().stream()
                .filter(p -> p.getOrder().getProduct().getSeller().getEmail().equals(userDetails.getUsername()))
                .collect(java.util.stream.Collectors.toList());
    }
}
