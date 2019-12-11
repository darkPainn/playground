import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: ['']
})
export class HeaderComponent implements OnInit {

  constructor(
    //this is used in the template - don't delete
    private authService:AuthenticationService
  ) { }

  ngOnInit() {}

}
