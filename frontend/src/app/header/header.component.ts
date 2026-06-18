import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { Location } from '@angular/common';
import { MatSidenav } from '@angular/material/sidenav';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent implements OnInit {

  public login: boolean = false;
  userData: any = "";

  constructor(public api: ApiService, private app: AppComponent,private router: Router) { }

  @Input() public set login_temp(value: any) {
    if (value != '' && value != undefined && value != null) {
      this.login = value;
    }
  }

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      var data = localStorage.getItem("data");
      if (data) {
        this.userData = JSON.parse(data);
        this.login = true;
      }
    }

    this.api.emit_to_header.subscribe((data: any) => {
      if (data == 1) {
        if (typeof window !== 'undefined') {
          var res = localStorage.getItem("data");
          if (res) {
            this.userData = JSON.parse(res);
            this.login = true;
          }
        }
      }
    });
  }

  logOut() {
    localStorage.clear();
    this.app.login = false;
    this.login = false;
    this.router.navigate(['/login']);
  }
}


