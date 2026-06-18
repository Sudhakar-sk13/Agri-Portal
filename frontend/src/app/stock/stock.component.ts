import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../api.service';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrl: './stock.component.css'
})
export class StockComponent implements OnInit {

  userDataTemp: any = '';
  token: any = "";
  user_listing_card_details: any = '';
  UserData: any = [];
  showShimmer: boolean = false;
  EditData: any = "";
  index_id: any = "";
  nextPage: any = 1;
  totalPages: any = 0;
  currentPage: any = 0;
  isLoading: boolean = false;
  show_delete_poup: boolean = false;
  delete_id: any = "";
  i: any = 0;
  disabled: boolean = false;
  checked: boolean = false;
  is_popup: boolean = false;
  show_row_loader: boolean = false;
  is_update: boolean = false;
  stock_type_description: any = '';
  estimated_amount: any = '';
  total_kg: any = '';
  update_id: any = '';
  description: any = '';
  selectedUser: any = '';
  selectedStock: any = '';
  StockTypeData: any = [];
  StockData: any = [];

  constructor(public api: ApiService, private snackbar: MatSnackBar) { }

  @ViewChild('drawer')
  drawer!: MatSidenav;

  @ViewChild('profileInput')
  profileInput!: ElementRef;


  @ViewChild('aadharInput')
  aadharInput!: ElementRef;

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      var data = localStorage.getItem("data");
      var token = localStorage.getItem("token");
      if (data && token) {
        this.userDataTemp = JSON.parse(data);
        this.token = JSON.parse(token);
        this.UserListing(token, this.nextPage, 10);
        this.GetAllStockType(token);
        this.StockListing(token);
        // this.showShimmer = true;
      }
    }
  }

  GetAllStockType(token: any) {
    this.api.getAllStockType(token).subscribe((res: any) => {
      if (res.status == 200) {
        this.StockTypeData = res.data;
      } else {
      }
    })
  }

  StockListing(token: any) {
    this.api.GetAllStocks(token).subscribe((res: any) => {
      if (res.status == 200) {
        this.StockData = res.data;
      } else {
      }
    })
  }

  UserListing(token: any, page: any, limit: any) {
    this.api.GetAllUsers(token).subscribe((res: any) => {
      if (res.status == 200) {
        this.UserData = res.data;
      } else {
      }
    }, (error: any) => {
      if (error.status == 401) {
        this.snackbar.openFromComponent(SnackbarComponent, {
          data: error.error.message,
          duration: 1000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['error-bar'],
        });
      }
    })
  }

  UserStatistic() {
  }


  onScroll(): void {
    if (this.nextPage != null && !this.isLoading) {
      this.show_row_loader = true;
      this.isLoading = true;
      this.UserListing(this.token, this.nextPage, 10);
    }
  }

  closePopup() {
    this.is_popup = false;
  }

  save() {
    var data = {
      user_id: this.selectedUser,
      stock_type: this.selectedStock,
      stock_type_description: this.stock_type_description,
      estimated_amount: this.estimated_amount,
      total_kg: this.total_kg,
    }
    if (this.is_update) {
      this.api.UpdateStock(data, this.token, this.update_id).subscribe((res: any) => {
        if (res.status == 200) {
          this.snackbar.openFromComponent(SnackbarComponent, {
            data: res.message,
            duration: 1000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['success-bar'],
          });
          this.StockListing(this.token);
          this.drawer.toggle();
        }
      }, (error: any) => {
        if (error.status == 401) {
          this.snackbar.openFromComponent(SnackbarComponent, {
            data: error.error.message,
            duration: 1000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['error-bar'],
          });
        }
      })
    } else {
      this.api.CreateStock(data, this.token).subscribe((res: any) => {
        if (res.status == 200) {
          this.snackbar.openFromComponent(SnackbarComponent, {
            data: res.message,
            duration: 1000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['success-bar'],
          });
          this.StockListing(this.token);
          this.drawer.toggle();
        }
      }, (error: any) => {
        if (error.status == 401) {
          this.snackbar.openFromComponent(SnackbarComponent, {
            data: error.error.message,
            duration: 1000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['error-bar'],
          });
        }
      })
    }
  }

  openDrawer(data: any, index: any) {
    this.EditData = data;
    this.update_id = data._id;
    this.selectedUser = data.user_id;
    this.selectedStock = data.stock_type;
    this.estimated_amount = data.estimated_amount;
    this.total_kg = data.total_kg;
    this.stock_type_description = data.stock_type_description;
    this.description = data.description;
    this.is_update = true;
    this.index_id = index;
    this.drawer.toggle()
  }

  deleteUser(id: any) {
    this.delete_id = id;
    this.show_delete_poup = true + this.i;
    this.i++;
  }

  UserDelete(event: any) {
    this.api.DeleteUser(this.token, this.delete_id).subscribe((res: any) => {
      if (res.status == 200) {
        this.snackbar.openFromComponent(SnackbarComponent, {
          data: 'User has been soft deleted successfully.',
          duration: 1000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['success-bar'],
        });
        this.UserListing(this.token, this.nextPage, 10);
      }
    })
  }
}
