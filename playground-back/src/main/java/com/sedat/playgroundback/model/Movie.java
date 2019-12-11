package com.sedat.playgroundback.model;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@NamedQueries(
		{ @NamedQuery(name = "Movie.searchByTitle", query = "SELECT m FROM Movie m WHERE LOWER(m.title) LIKE LOWER(:title)"),
		  @NamedQuery(name = "Movie.searchByType", query = "SELECT m FROM Movie m WHERE LOWER(m.type) LIKE LOWER(:type)")
		}
	)
public class Movie {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String title;
	@ManyToMany(cascade = {CascadeType.DETACH})
	@JoinTable(name="movie_director", joinColumns=@JoinColumn(name="movie_id"), inverseJoinColumns=@JoinColumn(name="director_id"))	
	private List<Director> directors;
	@Temporal(TemporalType.DATE)
	private Date releaseDate;
	private String type;
	
	public Movie() {}

	public Movie(String title, List<Director> directors, Date releaseDate, String type) {
		this.title = title;
		this.directors = directors;
		this.releaseDate = releaseDate;
		this.type = type;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public List<Director> getDirectors() {
		return directors;
	}

	public void setDirectors(List<Director> directors) {
		this.directors = directors;
	}

	public Date getReleaseDate() {
		return releaseDate;
	}

	public void setReleaseDate(Date releaseDate) {
		this.releaseDate = releaseDate;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	@Override
	public String toString() {
		return "Movie [id=" + id + ", title=" + title + ", directors=" + directors + ", releaseDate=" + releaseDate
				+ ", type=" + type + "]";
	}	
	

}
