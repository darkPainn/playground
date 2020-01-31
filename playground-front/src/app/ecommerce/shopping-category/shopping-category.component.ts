import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-shopping-category',
  templateUrl: './shopping-category.component.html',
  styleUrls: ['./shopping-category.component.css']
})
export class ShoppingCategoryComponent implements OnInit {

  private productCategoryNames:string[]=[];

  constructor(
    private productService:ProductService
  ) { }

  ngOnInit() {
    this.productService.fetchProductCategoryNames().subscribe(
      data => {
        this.productCategoryNames = data;
      }
    );
  }

}
