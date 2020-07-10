import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MoviesComponent } from './movies/movies.component';
import { HomeComponent } from './home/home.component';
import { UpdateMovieComponent } from './movies/update-movie/update-movie.component';
import { DuckHuntComponent } from './duck-hunt/duck-hunt.component';
import { LoginComponent } from './authentication/login/login.component';
import { LogoutComponent } from './authentication/logout/logout.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { HttpInterceptorService } from './services/http-interceptor.service';
import { EcommerceHeaderComponent } from './ecommerce/ecommerce-header/ecommerce-header.component';
import { ShoppingCategoryComponent } from './ecommerce/shopping-category/shopping-category.component';
import { ProductListComponent } from './ecommerce/product-list/product-list.component';
import { ProductService } from './ecommerce/services/product.service';
import { ShoppingChartComponent } from './ecommerce/shopping-chart/shopping-chart.component';
import { ProductDetailComponent } from './ecommerce/product-detail/product-detail.component';
import { SearchComponent } from './ecommerce/search/search.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; 

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MoviesComponent,
    HomeComponent,
    UpdateMovieComponent,
    DuckHuntComponent,
    LoginComponent,
    LogoutComponent,
    SignupComponent,
    EcommerceHeaderComponent,
    ShoppingCategoryComponent,
    ProductListComponent,
    ShoppingChartComponent,
    ProductDetailComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:HttpInterceptorService,multi:true},
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
