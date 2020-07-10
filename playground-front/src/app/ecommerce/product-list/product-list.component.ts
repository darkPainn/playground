import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product';
import { ProductService } from '../services/product.service';
import { ChartService } from '../services/chart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Page } from '../model/Page';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
//THIS COMPONENT IS THE RIGHT HAND SIDE OF THE ECOMMERCE VIEW - THE LIST OF THE AVAILABLE PRODUCTS
export class ProductListComponent implements OnInit {

  private products:Product[] = [];
  private page:Page;
  private productCategoryName:string='all';
  private searchTerm:string=null;
  private searchMode:boolean=false;

  constructor(
    private productService:ProductService,
    private chartService:ChartService,
    private route:ActivatedRoute,
    private router:Router
  ) {this.page = new Page(1, 10, 25); }

  ngOnInit() {
    this.route.paramMap.subscribe( () => {this.listProducts();}); 
    /*this.productService.fetchProductsPaginate(0,10).subscribe( response => {
      console.log(response.page);
      this.products = response._embedded.products;
      this.page.currentPage = response.page.number+1;
      this.page.elementsPerPage = response.page.size;
      this.page.totalElements = response.page.totalElements;
    } );  */  
  }

  listProducts(){
    if(this.route.snapshot.paramMap.has('searchTerm')){
      this.searchMode=true;
      this.searchTerm = this.route.snapshot.params['searchTerm'];
      this.productService.fetchProductsForSearch(this.searchTerm).subscribe(
        response => {
          this.products = response;
        },
        error => {
        }
      );
      
      return;
    }
    //by default productCategory is 'all' if the user clicked on a category, then the appropriate category name is assigned
    this.productCategoryName = this.route.snapshot.params['productCategory'];
    this.productService.fetchAllProducts(this.productCategoryName).subscribe(
      response => {
        //console.log(response);
        this.products = response;
        
        console.log(this.page);
      },
      error => {
        if(error.status === 404){
          this.router.navigate(['/ecommerce/products/all']);
        }
      }
    );  
  }

  addProductToChart(i:number){
    this.chartService.addProductToChart(this.products[i]);    
  }

}
