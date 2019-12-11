import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/app/model/Movie';
import { MovieService } from 'src/app/services/movie.service';
import { Director } from 'src/app/model/Director';

@Component({
  selector: 'app-update-movie',
  templateUrl: './update-movie.component.html',
  styles: ['']
})
export class UpdateMovieComponent implements OnInit {

  private movieId:number;
  private movie:Movie;
  private errorMessage:string;
  private pageHeader:string;
  private directorNames:string = '';

  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private movieService:MovieService
  ) { }

  ngOnInit() {
    this.movieId = this.route.snapshot.params['id'];
    if(this.movieId == -1){
      this.createMovie();
    }else{      
      this.updateMovie();
    }
  }

  createMovie(){
    this.pageHeader = 'Create a movie';
    let director:Director = new Director('');
    this.movie = new Movie(0,'',[], new Date(),'');
    this.movie.directors.push(director);
  }

  updateMovie(){
    //this call is to create a dummy movie while we are fetching the real movie to avoid 'cannot read property of undefined' errors
    this.createMovie();
    this.pageHeader = 'Update the movie';
    this.movieService.fetchMovieById(this.movieId).subscribe(
      response => {
        this.movie = response;
        for(let tempDirector of this.movie.directors){
          this.directorNames += ', ' + tempDirector.name;
        }
        this.directorNames = this.directorNames.substring(2);
      },
      () => {
        this.errorMessage = 'An error occured on the server. Please try again later!';
      }
    );
  }

  //regardless whether we are updating or creating a new movie
  handleFormSubmission(){
    let directors:string[] = this.directorNames.split(',');
    this.movie.directors.length = 0;
    for(let eachName of directors){
      if(eachName.length > 2){
        let tempDirector = new Director(eachName);
        this.movie.directors.push(tempDirector);
      }
    }

    if(this.movieId == -1){    
      this.movieService.createMovie(this.movie).subscribe(
        () => {
          this.router.navigate(['/movies']);
        },
        error => {
          this.errorMessage = error.message;
        }
      );
    }else{
      this.movieService.updateMovie(this.movie).subscribe(
        () => {
          this.router.navigate(['/movies']);
        },
        error => {
          this.errorMessage = error.message;
        }
      );
    }
  }

}
