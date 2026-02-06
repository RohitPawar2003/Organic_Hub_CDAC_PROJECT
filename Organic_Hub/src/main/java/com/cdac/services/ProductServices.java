package com.cdac.services;

import com.cdac.dto.ProductDto;
import com.cdac.modelmvc.Product;
import java.util.List;

public interface ProductServices {

    ProductDto addProduct(ProductDto productDto);
    ProductDto updateProduct(Long productId, ProductDto productDto);
    void deleteProduct(Long productId);
    ProductDto getProductById(Long productId);
    List<ProductDto> getAllProducts();
}
