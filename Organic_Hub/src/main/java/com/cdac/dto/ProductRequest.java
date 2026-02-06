package com.cdac.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public class ProductRequest {

    @NotBlank(message = "Product name is required")
    private String productsname;

    @NotNull(message = "Stock is required")
    @Min(value = 1, message = "Stock must be at least 1")
    private Integer stock;

    @NotNull(message = "Price is required")
    @Positive(message = "Price must be greater than 0")
    private Double price;

    private String imageName;

    @NotNull(message = "Category ID is required")
    private Long categoryId;

    // getters & setters
    public String getProductsname() {
        return productsname;
    }

    public void setProductsname(String productsname) {
        this.productsname = productsname;
    }

    public Integer getStock() {
        return stock;
    }

    public void setStock(Integer stock) {
        this.stock = stock;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getImageName() {
        return imageName;
    }

    public void setImageName(String imageName) {
        this.imageName = imageName;
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }
}
