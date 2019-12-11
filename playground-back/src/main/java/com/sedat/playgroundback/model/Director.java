package com.sedat.playgroundback.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@NamedQueries(
		{
			@NamedQuery(name = "Director.searchByName", query = "SELECT d FROM Director d WHERE LOWER(d.name) LIKE LOWER(:name)")
		}
)
public class Director {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(unique = true)
	private String name;
	@ManyToMany(cascade = {CascadeType.DETACH, CascadeType.REFRESH, CascadeType.MERGE })
	@JoinTable(name="movie_director", joinColumns=@JoinColumn(name="director_id"), inverseJoinColumns=@JoinColumn(name="movie_id"))
	@JsonIgnore
	private List<Movie> movies;
	
	public Director() {}	

	public Director(String name, List<Movie> movies) {
		this.name = name;
		this.movies = movies;
	}

	public List<Movie> getMovies() {
		return movies;
	}

	public void setMovies(List<Movie> movies) {
		this.movies = movies;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Override
	public String toString() {
		return "Director [id=" + id + ", name=" + name + ", movies=" + movies + "]";
	}	

}
