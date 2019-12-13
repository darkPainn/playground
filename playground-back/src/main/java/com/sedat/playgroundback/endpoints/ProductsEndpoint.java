package com.sedat.playgroundback.endpoints;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sedat.playgroundback.model.Product;
import com.sedat.playgroundback.repository.ProductRepository;

@RestController
@RequestMapping("/product-service")
@CrossOrigin(origins = "http://localhost:4200")
public class ProductsEndpoint {
	
	@Autowired
	private ProductRepository productRepository;
	
	//CREATE A PRODUCT
	@PostMapping("/products")
	public ResponseEntity<Product> createProduct(@RequestBody Product product){
		Product result = this.productRepository.findById(this.productRepository.save(product).getId()).get();
		if(result != null) {
			return ResponseEntity.ok(result);			
		}
		return ResponseEntity.status(HttpStatus.NOT_MODIFIED).build();
	}
	
	//GET ALL THE PRODUCTS
	@GetMapping("/products")
	public ResponseEntity<List<Product>> getProducts(){
		List<Product> products = this.productRepository.findAll();
		if(products != null && products.size() > 0) {
			return ResponseEntity.ok(products);
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
	}
	
	//GET ONE PRODUCT
	@GetMapping("/products/{id}")
	public ResponseEntity<Product> getProduct(@PathVariable Long id){
		Product existingProduct = this.productRepository.findById(id).get();
		if(existingProduct != null) {
			return ResponseEntity.ok(existingProduct);
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
	}
	
	//UPDATE A PRODUCT
	@PutMapping("/products/{id}")
	public ResponseEntity<Product> updateProduct(@RequestBody Product product) {
		Product existingProduct = this.productRepository.findById(product.getId()).get();
		if(existingProduct != null) {
			existingProduct = product;
			this.productRepository.save(existingProduct);
			return ResponseEntity.ok(existingProduct);
		}
		return ResponseEntity.status(HttpStatus.NOT_MODIFIED).build();
	}
	
	@DeleteMapping("/products/{id}")
	public ResponseEntity<Product> deleteProduct(@PathVariable Long id){
		Product existingProduct = this.productRepository.findById(id).get();
		if(existingProduct != null) {
			this.productRepository.delete(existingProduct);
			return ResponseEntity.ok(existingProduct);
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
	}

}



















