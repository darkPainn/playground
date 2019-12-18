import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product';
import { ProductService } from '../services/product.service';
import { ChartService } from '../services/chart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
//THIS COMPONENT IS THE RIGHT HAND SIDE OF THE ECOMMERCE VIEW - THE LIST OF THE AVAILABLE PRODUCTS
export class ProductListComponent implements OnInit {

  private products:Product[] = [];

  constructor(
    private productService:ProductService,
    private chartService:ChartService
  ) { }

  ngOnInit() {

    this.productService.fetchAllProducts().subscribe(
      response => {
        this.products = response;
      }
    );
  }

  addProductToChart(i:number){
    this.chartService.addProductToChart(this.products[i]);    
  }

}
