package com.cdac.services;

import com.cdac.modelmvc.Payment;

public interface PaymentServices {
	Payment makePayments(Payment payment);

	Payment getpaymentByOrderId(Long orderId);
}
