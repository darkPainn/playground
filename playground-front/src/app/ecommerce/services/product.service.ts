import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../model/product';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseURL:string = 'http://localhost:8080/product-service/products/';

  constructor(
    private http:HttpClient    
  ) { }

  fetchAllProducts(categoryName:string){
    console.log('product category is: ' + categoryName);
    if(categoryName === 'all' || categoryName === '' || categoryName == null){
      return this.http.get<Product[]>(this.baseURL);
      //return this.http.get<Product[]>('http://localhost:8080/products?page=0&size=10');
    }else{
      return this.http.get<Product[]>('http://localhost:8080/productcategory-service/products-for-category/' + categoryName);
    }
  }

  getProductWithId(id:number){
    return this.http.get<Product>(this.baseURL + id);
  }

  fetchProductCategoryNames(){
    return this.http.get<string[]>('http://localhost:8080/productcategory-service/categories');
  }

  updateProducts(categoryName:string){
    return this.fetchAllProducts(categoryName);
  }

  fetchProductsForSearch(searchTerm:string){
    return this.http.get<Product[]>(`${this.baseURL}search/${searchTerm}`);
  }

  doCheckOut(products:Product[]){
    return this.http.put(this.baseURL,products);
  }

  /*fetchProductsPaginate(thePage:number, size:number){
    return this.http.get<Product[]>(`http://localhost:8080/products?page=${thePage}&size=${size}`);
  }*/
  
}
