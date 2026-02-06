package com.cdac.services;

import java.util.List;

import com.cdac.modelmvc.User;

public interface UserServices {
	User registerUser(User user);
	List<User> getAllUser();
}
