import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Movie } from '../model/Movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private baseUrl:string = 'http://localhost:8080/movie-service/movies/';
  constructor(
    private http:HttpClient
  ) { }

  fetchAllMovies(){
    return this.http.get<Movie[]>(this.baseUrl)
  }

  fetchMovieById(id:number){
    return this.http.get<Movie>(this.baseUrl + id);
  }

  deleteMovieById(id:number){
    return this.http.delete(this.baseUrl + id);
  }

  createMovie(movie:Movie){
    return this.http.post(this.baseUrl,movie);
  }

  updateMovie(movie:Movie){
    return this.http.put(this.baseUrl,movie);
  }

  searchForMovie(searchTerm:string){
    return this.http.get<Movie[]>(this.baseUrl + 'search/' + searchTerm);
  }
}
