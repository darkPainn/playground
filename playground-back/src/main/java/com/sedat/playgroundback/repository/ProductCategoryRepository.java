package com.sedat.playgroundback.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.sedat.playgroundback.model.ProductCategory;

/*If you want to use auto-paths (without creating the endpoints) 
@RepositoryRestResource*/
public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Long> {
	
	@Query("select DISTINCT p.categoryName from ProductCategory p")
	public String[] getCategoryNames();

}
