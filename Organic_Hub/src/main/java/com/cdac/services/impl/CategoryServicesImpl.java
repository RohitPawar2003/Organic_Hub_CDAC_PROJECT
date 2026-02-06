package com.cdac.services.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cdac.modelmvc.Category;
import com.cdac.repository.CategoryRepository;
import com.cdac.services.CategoryServices;

@Service
public class CategoryServicesImpl implements CategoryServices{
	
	@Autowired
	private CategoryRepository categoryRepository;
	
	@Override
	public Category addCategory(Category category) {
		return categoryRepository.save(category);
	}

	@Override
	public List<Category> getAllCategory() {
		return categoryRepository.findAll();
	}

}
