package com.cdac.repository;

import com.cdac.modelmvc.Category;
import com.cdac.modelmvc.User;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    
    boolean existsByEmail(String email);

    User findByEmail(String email);
	
}
