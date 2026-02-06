package com.cdac.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cdac.modelmvc.Payment;

@Repository
public interface PaymentsRepository extends JpaRepository<Payment, Long>{
	Payment findByOrder_OrderId(Long orderId);
}
