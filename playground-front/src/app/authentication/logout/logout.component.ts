import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  template: `<h1>Redirecting...</h1>`,
  styles: ['']
})
export class LogoutComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

}
