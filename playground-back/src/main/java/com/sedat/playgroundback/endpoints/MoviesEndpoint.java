package com.sedat.playgroundback.endpoints;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.EntityManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sedat.playgroundback.model.Director;
import com.sedat.playgroundback.model.Movie;
import com.sedat.playgroundback.repository.DirectorRepository;
import com.sedat.playgroundback.repository.MoviesRepository;

@RestController
@RequestMapping("/movie-service")
public class MoviesEndpoint {

	@Autowired
	private MoviesRepository movieRepository;

	@Autowired
	private DirectorRepository directorRep;
	
	@Autowired
	private EntityManager manager;

	// ==============ALL CRUD OPERATIONS=================//

	// ======CREATE===============//
	@PostMapping("/movies")
	public ResponseEntity<Void> createMovie(@RequestBody Movie movie) {
		movie.setDirectors(this.manageDirectors(movie.getDirectors()));
		try {
			movieRepository.save(movie);
		} catch (Exception exc) {
			return ResponseEntity.status(HttpStatus.NOT_MODIFIED).build();
		}
		return ResponseEntity.ok().build();
	}

	// ======READ===============//
	@GetMapping("/movies/{id}")
	public Movie getMovieById(@PathVariable("id") Long id) {
		return movieRepository.findById(id).get();
	}

	@GetMapping("/movies")
	@Transactional(readOnly = true)
	public List<Movie> getAllMovies() {
		return movieRepository.findAll();
	}

	// ======SEARCH===============//
	@GetMapping("/movies/search/{searchTerm}")
	public List<Movie> searchForMovie(@PathVariable("searchTerm") String searchTerm) {
		if(searchTerm == null || searchTerm.length() < 1) return null;
		Set<Movie> result = new HashSet<>();
		result.addAll(this.manager.createNamedQuery("Movie.searchByTitle").setParameter("title", "%" + searchTerm + "%").getResultList());
		result.addAll(this.manager.createNamedQuery("Movie.searchByType").setParameter("type", "%" + searchTerm + "%").getResultList());
		List<Director> directors = this.manager.createNamedQuery("Director.searchByName").setParameter("name", "%" + searchTerm + "%").getResultList();
		for(Director director : directors) {
			result.addAll(director.getMovies());
		}
		try {	
			DateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			Date date = sdf.parse(searchTerm);
			result.addAll(this.movieRepository.findAllWithReleaseDate(date));
		}catch(Exception e) {
			
		}
		
		return new ArrayList<>(result);
	}

	// ======UPDATE===============//
	@PutMapping("/movies")
	public ResponseEntity<Void> updateMovie(@RequestBody Movie movie) {
		Movie incomingMovie = this.movieRepository.findById(movie.getId()).get();
		if (incomingMovie != null) {
			movie.setDirectors(this.manageDirectors(movie.getDirectors()));
			try {
				this.movieRepository.save(movie);
			} catch (Exception e) {
				return ResponseEntity.status(HttpStatus.NOT_MODIFIED).build();
			}
		}
		return ResponseEntity.ok().build();
	}

	// ======DELETE===============//
	@DeleteMapping("/movies/{id}")
	public ResponseEntity<Void> deleteMovie(@PathVariable("id") Long id) {
		try {
			Movie movie = this.movieRepository.findById(id).get();
			this.movieRepository.delete(movie);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_MODIFIED).build();
		}
		return ResponseEntity.ok().build();
	}

	private List<Director> manageDirectors(List<Director> directors) {
		List<Director> resultDirectors = new ArrayList<>();
		for (Director eacDirector : directors) {
			Director tempDirector = this.directorRep.findByName(eacDirector.getName());
			if (tempDirector == null) {
				eacDirector.setId(this.directorRep.save(eacDirector).getId());
			} else {
				eacDirector.setId(tempDirector.getId());
			}
			resultDirectors.add(eacDirector);
		}

		return resultDirectors;
	}

}
