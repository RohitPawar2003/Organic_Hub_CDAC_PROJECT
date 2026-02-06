package com.cdac.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.cdac.modelmvc.OrderItem;
import com.cdac.modelmvc.User;

public interface OrderItemsRepository extends JpaRepository<OrderItem, Long> {

    List<OrderItem> findByOrderCustomer(User customer);

    OrderItem findByOrderCustomerAndProductProductId(User customer, Long productId);

    List<OrderItem> findByOrderOrderId(Long orderId);
}
