import { Injectable } from '@angular/core';
import { Product } from '../model/product';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  //this should be the updated products for the given session
  public products:Product[] = [];
  private _productAddedSource = new Subject<Product>();
  productAddedSourceChanged$ = this._productAddedSource.asObservable();

  constructor() { }

  addProductToChart(product:Product){
    //console.log('chartservice adding the ' + product.description);
    this.products.push(product);
    this._productAddedSource.next(product);
  }

  getShoppingChartProducts(){
    return this.products;
  }

  calculateCartTotal():number{
    let total:number = 0;
    for(let product of this.products){
      total += product.unitPrice;
    }
    return total;
  }

  getNumberOfItemsInCart():number{
    return this.products.length;
  }

}
