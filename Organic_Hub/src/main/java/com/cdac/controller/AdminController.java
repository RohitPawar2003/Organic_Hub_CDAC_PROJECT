package com.cdac.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.cdac.modelmvc.Category;
import com.cdac.modelmvc.User;
import com.cdac.services.CategoryServices;
import com.cdac.services.UserServices;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {

    @Autowired
    private CategoryServices categoryServices;

    @Autowired
    private UserServices userServices;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/addCategory")
    public Category addCategory(@RequestBody Category category) {
        return categoryServices.addCategory(category);
    }

    @GetMapping("/allUsers")
    public List<User> getAllUsers() {
        return userServices.getAllUser();
    }
}
