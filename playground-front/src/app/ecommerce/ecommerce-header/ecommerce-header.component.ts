import { Component, OnInit } from '@angular/core';
import { ChartService } from '../services/chart.service';

@Component({
  selector: 'app-ecommerce-header',
  templateUrl: './ecommerce-header.component.html',
  styleUrls: ['./ecommerce-header.component.css']
})
export class EcommerceHeaderComponent implements OnInit {
  private cartTotal:number = 0;
  private numberOfItemsInCart:number = 0;

  constructor(
    private cartService:ChartService
  ) { }

  ngOnInit() {
    this.cartTotal = this.cartService.calculateCartTotal();
    this.numberOfItemsInCart = this.cartService.getNumberOfItemsInCart();
    this.cartService.productAddedSourceChanged$.subscribe(
      () => {
        this.cartTotal = this.cartService.calculateCartTotal();
        this.numberOfItemsInCart = this.cartService.getNumberOfItemsInCart();
      },
      error => {
        console.log('error occured on chart service' + error); 
      }
    );
  }  

}
