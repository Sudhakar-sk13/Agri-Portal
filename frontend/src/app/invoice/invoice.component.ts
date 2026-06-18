import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../api.service';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.css',
})
export class InvoiceComponent implements OnInit {
  userDataTemp: any = '';
  token: any = '';
  user_listing_card_details: any = '';
  ClientData: any = [];
  showShimmer: boolean = false;
  EditData: any = '';
  index_id: any = '';
  nextPage: any = 1;
  totalPages: any = 0;
  currentPage: any = 0;
  isLoading: boolean = false;
  show_delete_poup: boolean = false;
  delete_id: any = '';
  i: any = 0;
  disabled: boolean = false;
  checked: boolean = false;
  is_popup: boolean = false;
  show_row_loader: boolean = false;
  is_update: boolean = false;
  update_id: any = '';
  selectedClient: any = '';
  selectedStock: any = '';
  StockData: any = '';
  payment_method: any = '';
  invoiceData: any = [];

  constructor(public api: ApiService, private snackbar: MatSnackBar) {}

  @ViewChild('drawer')
  drawer!: MatSidenav;

  @ViewChild('profileInput')
  profileInput!: ElementRef;

  @ViewChild('aadharInput')
  aadharInput!: ElementRef;

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      var data = localStorage.getItem('data');
      var token = localStorage.getItem('token');
      if (data && token) {
        this.userDataTemp = JSON.parse(data);
        this.token = JSON.parse(token);
        this.GetAllClientsData(token, this.nextPage, 999999);
        this.GetUnSoldStocks(token);
        this.GetAllInvcoies(token, new Date());
        // this.showShimmer = true;
      }
    }
  }

  GetAllInvcoies(token: String, isoDate: any) {
    this.api.GetAllInvcoies(token, isoDate).subscribe((res: any) => {
      this.invoiceData = res.data;
    });
  }

  GetUnSoldStocks(token: string) {
    this.api.GetUnSoldStocks(token).subscribe((res: any) => {
      this.StockData = res.data;
    });
  }

  GetAllClientsData(token: any, page: any, limit: any) {
    this.api.GetAllClients(token).subscribe(
      (res: any) => {
        if (res.status == 200) {
          this.ClientData = res.data;
        } else {
        }
      },
      (error: any) => {
        if (error.status == 401) {
          this.snackbar.openFromComponent(SnackbarComponent, {
            data: error.error.message,
            duration: 1000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['error-bar'],
          });
        }
      }
    );
  }

  UserStatistic() {
    // this.api.UserStatistic(this.userDataTemp.auth_token).subscribe((res: any) => {
    //   this.user_listing_card_details = res.data
    // })
  }

  onScroll(): void {
    if (this.nextPage != null && !this.isLoading) {
      this.show_row_loader = true;
      this.isLoading = true;
      // this.UserListing(this.token, this.nextPage, 10);
    }
  }

  closePopup() {
    this.is_popup = false;
  }

  save() {
    var data = {
      client_id: this.selectedClient,
      stock_id: this.selectedStock,
      payment_method: this.payment_method,
    };
    if (this.is_update) {
      this.api.UpdateInvcoie(data, this.token, this.update_id).subscribe(
        (res: any) => {
          if (res.status == 200) {
            this.snackbar.openFromComponent(SnackbarComponent, {
              data: res.message,
              duration: 1000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
              panelClass: ['success-bar'],
            });
            this.GetAllInvcoies(this.token, new Date());
            // this.UserListing(this.token, this.nextPage, 10);
            this.drawer.toggle();
          }
        },
        (error: any) => {
          if (error.status == 401) {
            this.snackbar.openFromComponent(SnackbarComponent, {
              data: error.error.message,
              duration: 1000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
              panelClass: ['error-bar'],
            });
          }
        }
      );
    } else {
      this.api.CreateInvcoie(data, this.token).subscribe(
        (res: any) => {
          if (res.status == 200) {
            this.snackbar.openFromComponent(SnackbarComponent, {
              data: res.message,
              duration: 1000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
              panelClass: ['success-bar'],
            });
            this.GetAllInvcoies(this.token, new Date());
            // this.UserListing(this.token, this.nextPage, 10);
            this.drawer.toggle();
          }
        },
        (error: any) => {
          if (error.status == 401) {
            this.snackbar.openFromComponent(SnackbarComponent, {
              data: error.error.message,
              duration: 1000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
              panelClass: ['error-bar'],
            });
          }
        }
      );
    }
  }

  openDrawer(data: any, index: any) {
    this.EditData = data;
    this.update_id = data._id;
    // this.name = data.name;
    // this.phone_number = data.phone_number;
    // this.age = data.age;
    // this.description = data.description;
    // this.address = data.address;
    // this.gender = data.gender;
    this.is_update = true;
    this.index_id = index;
    this.drawer.toggle();
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
        // this.UserListing(this.token, this.nextPage, 10);
      }
    });
  }

  onDateFilterChange(event: Event) {
    const today = new Date();
    let filterDate: Date;
    const selectedValue = (event.target as HTMLSelectElement).value;

    switch (selectedValue) {
      case 'day':
        filterDate = new Date(today.setDate(today.getDate() - 1));
        break;
      case 'week':
        filterDate = new Date(today.setDate(today.getDate() - 7));
        break;
      case 'month':
        filterDate = new Date(today.setMonth(today.getMonth() - 1));
        break;
      case 'year':
        filterDate = new Date(today.setFullYear(today.getFullYear() - 1));
        break;
      default:
        filterDate = new Date();
    }

    if (filterDate) {
      this.GetAllInvcoies(this.token, filterDate);
    }
  }
}
