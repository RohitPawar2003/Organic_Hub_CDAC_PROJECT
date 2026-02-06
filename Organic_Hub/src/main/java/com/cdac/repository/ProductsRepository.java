package com.cdac.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cdac.modelmvc.Product;

@Repository
public interface ProductsRepository extends JpaRepository<Product, Long>{
	List<Product> findByCategory_CategoryId(Long catgeoryId);
	List<Product> findBySeller_Id(Long sellerId);
}
