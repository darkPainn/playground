import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product';
import { ChartService } from '../services/chart.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-shopping-chart',
  templateUrl: './shopping-chart.component.html',
  styleUrls: ['./shopping-chart.component.css']
})
export class ShoppingChartComponent implements OnInit {

  private products:Product[]= [];
  private productQuantityMap = new Map();
  private cartTotal:number = 0;
  private shippingCost:number=0;  
  private numberOfItemsInCart:number = 0;
  private orderPlacedSuccess:boolean=false;
  private orderPlacedFail:boolean=false;

  constructor(
    private cartService:ChartService,
    private productService:ProductService
  ) { }

  ngOnInit() {
    this.cartTotal = this.cartService.calculateCartTotal();
    this.productQuantityMap = this.cartService.getShoppingChartProducts();
    this.numberOfItemsInCart = this.cartService.getNumberOfItemsInCart();
    this.products = this.populateProductList();   
    this.cartService.productAddedSourceChanged$.subscribe(
      () => {
        this.cartTotal = this.cartService.calculateCartTotal();
        this.productQuantityMap = this.cartService.getShoppingChartProducts();
        this.numberOfItemsInCart = this.cartService.getNumberOfItemsInCart();
        this.products = this.populateProductList();
      },
      error => {
        console.log('error occured on chart service' + error); 
      }
    );
  }

  removeItemFromList(product:Product){
    this.cartService.removeProductFromCart(product);
  }

  increaseQuantity(product:Product) {
    this.cartService.addProductToChart(product);
  }
  
  decreaseQuantity(product:Product) {
    this.cartService.decreaseProduct(product);
  }

  populateProductList():Product[]{
    let tempProducts:Product[] = [];
    for(let eachProduct of this.productQuantityMap.keys()){
      tempProducts.push(eachProduct);
    }
    return tempProducts 
  }

  processCheckOut(){
    if(confirm('Are you sure you want to place this order?')){
      let products:Product[]=[];
      for(let eachProduct of this.productQuantityMap.keys()){
        eachProduct.unitsInStock -= this.productQuantityMap.get(eachProduct);
        products.push(eachProduct);
      }
      this.productService.doCheckOut(products).subscribe(
        () => {
          this.orderPlacedSuccess = true;
          this.orderPlacedFail = false;
          this.cartService.reflectCheckOut();
        },
        error => {
          this.orderPlacedFail = true;
          this.orderPlacedSuccess = false;
          console.log(error)
        }
      );
    }    
  }
    
}
