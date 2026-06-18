import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  title = 'spotme';
  login: boolean = false;
  userData: any = "";
  search: any = "";
  constructor(public api: ApiService, private router: Router, private location: Location,) { }
  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      var data = localStorage.getItem("data");
      if (data) {
        this.userData = JSON.parse(data);
        this.login = true;
      } else {
        this.router.navigate(['/login']);
      }
    }
  }
}