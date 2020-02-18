import { Injectable } from '@angular/core';
import { Product } from '../model/product';
import { Subject } from 'rxjs';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  private _productAddedSource = new Subject<Product>();
  productAddedSourceChanged$ = this._productAddedSource.asObservable();

  //this should be the updated products for the given session at all time
  private productQuantityMap = new Map();

  constructor(private productService:ProductService) { }

  addProductToChart(product:Product){
    if(!this.productQuantityMap.has(product)){
      this.productQuantityMap.set(product, 1);
    }else{
      this.productQuantityMap.set(product, this.productQuantityMap.get(product) + 1);
    }    
    this.cartChanged(product);
  }

  decreaseProduct(product:Product){
    let quantity:number = this.productQuantityMap.get(product);
    if(quantity <= 1){
      this.productQuantityMap.delete(product);
    }else{
      this.productQuantityMap.set(product, quantity-1);
    }
    this.cartChanged(product);
  }

  removeProductFromCart(product:Product){
    this.productQuantityMap.delete(product);
    this.cartChanged(product);
  }

  cartChanged(product:Product){
    this._productAddedSource.next(product);
  }

  getShoppingChartProducts():Map<Product,number>{
    return this.productQuantityMap;
  }

  calculateCartTotal():number{
    let total:number = 0;
    for(let echProduct of this.productQuantityMap.keys()){
      total += (echProduct.unitPrice * this.productQuantityMap.get(echProduct));
    }
    return total;
  }

  getNumberOfItemsInCart():number{
    let numberOfItems:number = 0;
    for(let eachValue of this.productQuantityMap.values()){
      numberOfItems += eachValue;
    }
    return numberOfItems;
  }

  reflectCheckOut(){
    this.productQuantityMap.clear();
    this.cartChanged(null);       
  }

}
