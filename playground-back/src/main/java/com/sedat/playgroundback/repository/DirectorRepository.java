package com.sedat.playgroundback.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sedat.playgroundback.model.Director;

public interface DirectorRepository  extends JpaRepository<Director, Long>{
	
	public Director findByName(String name);

}
