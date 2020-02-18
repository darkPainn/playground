import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: ['']
})
export class SearchComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  searchForProduct(productSearchTerm:string){
    this.router.navigate(['/ecommerce/products/search/' + productSearchTerm]);
  }

}
