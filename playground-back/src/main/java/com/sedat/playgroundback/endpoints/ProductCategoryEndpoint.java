package com.sedat.playgroundback.endpoints;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sedat.playgroundback.model.Product;
import com.sedat.playgroundback.model.ProductCategory;
import com.sedat.playgroundback.repository.ProductCategoryRepository;

@RestController
@RequestMapping("/productcategory-service")
public class ProductCategoryEndpoint {
	
	@Autowired
	private ProductCategoryRepository repository;
	
	@GetMapping("/categories")
	public ResponseEntity<String[]> getCategories(){
		return ResponseEntity.ok(this.repository.getCategoryNames());
	}
	
	@GetMapping("/products-for-category/{categoryName}")
	public ResponseEntity<List<Product>> getProductsForCategory(@PathVariable String categoryName){
		ProductCategory category = this.repository.findByCategoryName(categoryName);
		if(category == null) {
			return ResponseEntity.notFound().build();
		}
		List<Product> result = new ArrayList<>();
		result.addAll(category.getProducts());
		return ResponseEntity.ok(result);
	}

}
