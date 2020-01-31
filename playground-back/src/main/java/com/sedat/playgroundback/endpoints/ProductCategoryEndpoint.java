package com.sedat.playgroundback.endpoints;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sedat.playgroundback.repository.ProductCategoryRepository;

@RestController
@RequestMapping("/productcategory-service")
@CrossOrigin(origins = "http://localhost:4200")
public class ProductCategoryEndpoint {
	
	@Autowired
	private ProductCategoryRepository repository;
	
	@GetMapping("/categories")
	public ResponseEntity<String[]> getCategories(){
		return ResponseEntity.ok(this.repository.getCategoryNames());
	}

}
