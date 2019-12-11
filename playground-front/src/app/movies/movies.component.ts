import { Component, OnInit } from '@angular/core';
import { Movie } from '../model/Movie';
import { Router } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { Director } from '../model/Director';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styles: ['']
})
export class MoviesComponent implements OnInit {

  private movies:Movie[] = [];
  private message:string;
  private noResultFound:string;

  constructor(
    private service:MovieService,
    private router:Router) { }

  ngOnInit() {
    this.fetchMovies();
  }

  createMovie(){
    this.router.navigate(['/update-movie/-1']);
  }

  deleteMovie(id:number){
    this.service.deleteMovieById(id).subscribe(
      response => {
        this.fetchMovies();
        this.message = "Movie deleted successfully!";
      }
    );
  }

  fetchMovies(){
    this.service.fetchAllMovies().subscribe(
      success =>{
        this.movies = success;
      }
    );
  }

  updateMovie(id:number){
    this.router.navigate([`/update-movie/${id}`]);
  }

  searchForMovie(searchTerm:string){
    this.service.searchForMovie(searchTerm).subscribe(
      response => {
        if(response.length > 0){
          this.movies = response;
          this.noResultFound = null;
        }else{
          this.noResultFound = 'Your search term didn\'t match any result';
        }
      },
      () => {
        this.noResultFound = 'An error occured on the server.';
      }
    );
  }

  sort(event){
    let sortBy:string = event.target.innerText;
    switch (sortBy) {
      case 'Title':
        this.movies.sort(function(a:Movie,b:Movie){
          let x:string = a.title.toLowerCase();
          let y:string = b.title.toLowerCase();
          if(x < y){return -1;}
          if(x > y){return 1;}
          return 0;
        });
        break;

      case 'Directors':
        //TODO
        break;

      case 'Release Date':
        this.movies.sort(function(a:Movie,b:Movie){
          let x:Date = a.releaseDate;
          let y:Date = b.releaseDate;
          if(x < y){return 1;}
          if(x > y){return -1;}
          return 0;
        });
        break;

      case 'Type':
        this.movies.sort(function(a:Movie,b:Movie){
          let x:string = a.type.toLowerCase();
          let y:string = b.type.toLowerCase();
          if(x < y){return -1;}
          if(x > y){return 1;}
          return 0;
        });
        break;
    }
  }

}
