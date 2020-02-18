import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../model/product';
import { ProductService } from '../services/product.service';
import { ChartService } from '../services/chart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  private product:Product = new Product(0,'','','',0,'',false,0,null,null);
  private errorMessage:string;

  constructor(
    private route:ActivatedRoute,
    private productService:ProductService,
    private chartService:ChartService
  ) { }

  ngOnInit() {
    let productId = this.route.snapshot.params['id'];
    this.productService.getProductWithId(productId).subscribe(
      data => {
        this.product = data;
      },
      error => {
        console.log(error);
        this.errorMessage = 'An Error occured fetching the product. Please try again later..'
      }
    );
  }

  addProductToChart(i:number){
    this.chartService.addProductToChart(this.product);    
  }

}
