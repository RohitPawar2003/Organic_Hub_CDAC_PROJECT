package com.cdac.services.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import com.cdac.dto.ProductDto;
import com.cdac.modelmvc.Category;
import com.cdac.modelmvc.Product;
import com.cdac.modelmvc.User;
import com.cdac.repository.CategoryRepository;
import com.cdac.repository.ProductsRepository;
import com.cdac.repository.UserRepository;
import com.cdac.services.ProductServices;

@Service
public class ProductServiceImpl implements ProductServices {

    @Autowired
    private ProductsRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public ProductDto addProduct(ProductDto dto) {
        Product product = new Product();
        product.setProductsname(dto.getProductsname());
        product.setPrice(dto.getPrice());
        product.setStock(dto.getStock());
        product.setImageName(dto.getImageName());

        Category category = categoryRepository.findById(dto.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));
        product.setCategory(category);

        User seller = userRepository.findById(dto.getSellerId())
                .orElseThrow(() -> new RuntimeException("Seller not found"));
        product.setSeller(seller);

        Product saved = productRepository.save(product);

        dto.setProductId(saved.getProductId());
        return dto;
    }

    @Override
    public ProductDto updateProduct(Long productId, ProductDto dto) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        product.setProductsname(dto.getProductsname());
        product.setPrice(dto.getPrice());
        product.setStock(dto.getStock());

        if (dto.getCategoryId() != null) {
            Category category = categoryRepository.findById(dto.getCategoryId())
                    .orElseThrow(() -> new RuntimeException("Category not found"));
            product.setCategory(category);
        }

        Product saved = productRepository.save(product);
        dto.setProductId(saved.getProductId());
        return dto;
    }

    @Override
    public void deleteProduct(Long productId) {
        productRepository.deleteById(productId);
    }

    @Override
    public ProductDto getProductById(Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        ProductDto dto = new ProductDto();
        dto.setProductId(product.getProductId());
        dto.setProductsname(product.getProductsname());
        dto.setPrice(product.getPrice());
        dto.setStock(product.getStock());
        dto.setCategoryId(product.getCategory().getCategoryId());
        dto.setCategoryName(product.getCategory().getCategoryName());
        dto.setSellerId(product.getSeller().getId());
        dto.setSellerName(product.getSeller().getUsername());

        return dto;
    }

    @Override
    public List<ProductDto> getAllProducts() {
        return productRepository.findAll().stream().map(product -> {
            ProductDto dto = new ProductDto();
            dto.setProductId(product.getProductId());
            dto.setProductsname(product.getProductsname());
            dto.setPrice(product.getPrice());
            dto.setStock(product.getStock());
            dto.setCategoryId(product.getCategory().getCategoryId());
            dto.setCategoryName(product.getCategory().getCategoryName());
            dto.setSellerId(product.getSeller().getId());
            dto.setSellerName(product.getSeller().getUsername()); // Use email/username for unique filtering
            return dto;
        }).collect(Collectors.toList());
    }
}
