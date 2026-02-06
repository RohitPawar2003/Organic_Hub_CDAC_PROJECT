package com.cdac.services;

import java.util.List;

import com.cdac.modelmvc.Category;

public interface CategoryServices {
	Category addCategory(Category category);
	List<Category> getAllCategory();
}
