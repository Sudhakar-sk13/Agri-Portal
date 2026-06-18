import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Location } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
  animations: [
    trigger('fadeInSlide', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-20px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ opacity: 0, transform: 'translateX(-20px)' })),
      ]),
    ]),
  ],
})
export class SidebarComponent implements OnInit {

  constructor(private api: ApiService, private location: Location) { }
  
  userDataTemp: any = '';
  token: any = '';

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      var data = localStorage.getItem("data");
      var token = localStorage.getItem("token");
      if (data && token) {
        this.userDataTemp = JSON.parse(data);
        this.token = JSON.parse(token);
      }
    }
  }

  openComponent(name: any) {
    var breadCrumbs = "";
    var page_topic = "";
    if (name == "dashboard") {
      breadCrumbs = "Dashboard";
      page_topic = "Main Dashboard";
    } else if (name == "users-list") {
      breadCrumbs = "Usrs List";
      page_topic = "Users";
    } else if (name == "stock-list") {
      breadCrumbs = "Stock List";
      page_topic = "Stocks";
    } else if (name == "clients-list") {
      breadCrumbs = "Client List";
      page_topic = "Clients";
    } else if (name == "invoice-list") {
      breadCrumbs = "Invoice List";
      page_topic = "Invoice";
    }
    this.api.BreadcrumbsChanges(breadCrumbs, page_topic);
  }
}
