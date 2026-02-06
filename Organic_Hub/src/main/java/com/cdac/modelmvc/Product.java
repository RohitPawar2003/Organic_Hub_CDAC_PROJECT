package com.cdac.modelmvc;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Entity
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long productId;

    @NotBlank(message = "required")
    private String productsname;

    @NotNull(message = "required")
    @Min(value = 1, message = "at least one")
    private Integer stock;

    @NotNull(message = "required")
    @Positive(message = "must be greater than zero")
    private Double price;

    private String imageName;

    @NotNull(message = "required")
    @ManyToOne
    @JoinColumn(name = "categoryId")
    private Category category;

    @NotNull(message = "required")
    @ManyToOne
    @JoinColumn(name = "sellerId")
    private User seller;

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

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

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public User getSeller() {
        return seller;
    }

    public void setSeller(User seller) {
        this.seller = seller;
    }
}
