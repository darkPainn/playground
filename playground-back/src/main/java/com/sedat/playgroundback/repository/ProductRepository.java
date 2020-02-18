package com.sedat.playgroundback.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.sedat.playgroundback.model.Product;

public interface ProductRepository extends JpaRepository<Product, Long>{
	
	@Query("select p from Product p where lower(p.name) like lower(:searchTerm)")
	List<Product> searchForProducts(@Param("searchTerm") String searchTerm);

}
