package com.cdac.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cdac.modelmvc.Payment;
import com.cdac.repository.PaymentsRepository;
import com.cdac.services.PaymentServices;

@Service
public class PaymentServiceImpl implements PaymentServices{
	
	@Autowired
	private PaymentsRepository paymentsRepository;
	
	@Override
	public Payment makePayments(Payment payment) {
		return paymentsRepository.save(payment);
	}
	@Override
	public Payment getpaymentByOrderId(Long orderId) {
		return paymentsRepository.findByOrder_OrderId(orderId);
	}
}
