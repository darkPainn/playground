import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product';
import { ChartService } from '../services/chart.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shopping-chart',
  templateUrl: './shopping-chart.component.html',
  styleUrls: ['./shopping-chart.component.css']
})
export class ShoppingChartComponent implements OnInit {

  private products:Product[]= [];
  private cartTotal:number = 0;

  constructor(
    private chartService:ChartService,
    private router:Router,
    private route:ActivatedRoute
  ) { }

  ngOnInit() {
    this.products = this.chartService.getShoppingChartProducts();
    this.cartTotal = this.chartService.calculateCartTotal();
    //this.router.navigate(['/ecommerce/shopping-chart'], {relativeTo:this.route})
  }

}
