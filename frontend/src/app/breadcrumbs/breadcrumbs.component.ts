import { Component, Injectable, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.css'
})

@Injectable({
  providedIn: 'root'
})

export class BreadcrumbsComponent implements OnInit {

  breadCrumbs = "";
  page_topic = "";

  constructor(private location: Location, private api: ApiService) {
  }

  ngOnInit(): void {
    let currentUrl = this.location.path();
    let currentUrlTemp = currentUrl.split("/");
    if (currentUrlTemp[1] == "dashboard") {
      this.breadCrumbs = "Dashboard";
      this.page_topic = "Main Dashboard"
    } else if (currentUrlTemp[1] == "users-list") {
      this.breadCrumbs = "Farmer List";
      this.page_topic = "Farmer";
    } else if (currentUrlTemp[1] == "stock-list") {
      this.breadCrumbs = "Stock List";
      this.page_topic = "Stocks";
    } else if (currentUrlTemp[1] == "clients-list") {
      this.breadCrumbs = "Client List";
      this.page_topic = "Clients";
    } else if (currentUrlTemp[1] == "invoice-list") {
      this.breadCrumbs = "Invoice List";
      this.page_topic = "Invoice";
    }
    this.api.emit_to_breadcrumbs.subscribe((res: any) => {
      if (res) {
        this.breadCrumbs = res.breadCrumbs;
        this.page_topic = res.page_topic;
      }
    })
  }
}
