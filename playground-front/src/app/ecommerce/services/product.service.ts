import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseURL:string = 'http://localhost:8080/product-service/products/'

  constructor(
    private http:HttpClient    
  ) { }

  fetchAllProducts(){
    return this.http.get<Product[]>(this.baseURL);
  }
}
