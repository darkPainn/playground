import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  private products:Product[] = [];

  constructor(
    private productService:ProductService
  ) { }

  ngOnInit() {

    this.productService.fetchAllProducts().subscribe(
      response => {
        this.products = response;
        console.log(response);
      }
    );
  }

}
