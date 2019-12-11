import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoviesComponent } from './movies/movies.component';
import { HomeComponent } from './home/home.component';
import { UpdateMovieComponent } from './movies/update-movie/update-movie.component';
import { DuckHuntComponent } from './duck-hunt/duck-hunt.component';
import { LoginComponent } from './authentication/login/login.component';
import { LoginGuard } from './guards/RouteGuard';
import { LogoutComponent } from './authentication/logout/logout.component';
import { SignupComponent } from './authentication/signup/signup.component';


const routes: Routes = [  
  {path:'login', component:LoginComponent},
  {path:'signup', component:SignupComponent},
  {path:'logout',component:LogoutComponent},
  {path:'',component:HomeComponent,canActivate:[LoginGuard]},
  {path:'home',component:HomeComponent,canActivate:[LoginGuard]},
  {path:'movies', component:MoviesComponent,canActivate:[LoginGuard]},  
  {path:'update-movie/:id', component:UpdateMovieComponent,canActivate:[LoginGuard]},
  {path:'duck-hunt', component:DuckHuntComponent,canActivate:[LoginGuard]},    
  {path:'**',component:HomeComponent,canActivate:[LoginGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
