package com.sedat.playgroundback.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sedat.playgroundback.model.Product;

public interface ProductRepository extends JpaRepository<Product, Long>{

}
