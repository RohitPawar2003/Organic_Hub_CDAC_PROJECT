package com.cdac.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cdac.modelmvc.Order;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long>{
	List<Order> findByCustomer_Id(Long userId);
}
