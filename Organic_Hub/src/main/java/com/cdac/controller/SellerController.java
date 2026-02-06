package com.cdac.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import com.cdac.dto.ProductDto;
import com.cdac.dto.ProductRequest;
import com.cdac.modelmvc.Category;
import com.cdac.modelmvc.Product;
import com.cdac.modelmvc.User;
import com.cdac.repository.CategoryRepository;
import com.cdac.repository.ProductsRepository;
import com.cdac.repository.UserRepository;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/seller")
@CrossOrigin(origins = "http://localhost:5173")
public class SellerController {

    @Autowired
    private ProductsRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @PostMapping("/addProduct")
    @PreAuthorize("hasRole('SHOPKEEPER')")
    public ProductDto addProduct(
            @Valid @RequestBody ProductRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {

        // fetch seller from JWT
        User seller = userRepository.findByEmail(userDetails.getUsername());
        if (seller == null) {
            throw new RuntimeException("Seller not found");
        }

        // fetch category by ID
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        // map request to entity
        Product product = new Product();
        product.setProductsname(request.getProductsname());
        product.setStock(request.getStock());
        product.setPrice(request.getPrice());
        product.setImageName(request.getImageName());
        product.setSeller(seller);
        product.setCategory(category);

        Product saved = productRepository.save(product);

        // map entity to DTO for response
        ProductDto dto = new ProductDto();
        dto.setProductId(saved.getProductId());
        dto.setProductsname(saved.getProductsname());
        dto.setStock(saved.getStock());
        dto.setPrice(saved.getPrice());
        dto.setCategoryId(category.getCategoryId());
        dto.setCategoryName(category.getCategoryName());
        dto.setImageName(saved.getImageName());
        dto.setSellerId(seller.getId());
        dto.setSellerName(seller.getUsername());

        return dto;
    }

    @GetMapping("/products")
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }
}
