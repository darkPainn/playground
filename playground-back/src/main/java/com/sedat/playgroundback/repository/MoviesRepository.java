package com.sedat.playgroundback.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.sedat.playgroundback.model.Movie;

public interface MoviesRepository extends JpaRepository<Movie, Long>{
	
	@Query("select m from Movie m where m.releaseDate = :releaseDate")
    List<Movie> findAllWithReleaseDate(@Param("releaseDate") Date releaseDate);

}
