import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../api.service';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css',
})
export class ClientsComponent implements OnInit {
  userDataTemp: any = '';
  token: any = '';
  user_listing_card_details: any = '';
  UserData: any = [];
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
  name: any = '';
  email: any = '';
  phone_number: any = '';
  age: any = '';
  address: any = '';
  gender: any = '';
  is_update: boolean = false;
  update_id: any = '';

  constructor(public api: ApiService, private snackbar: MatSnackBar) {}

  @ViewChild('drawer')
  drawer!: MatSidenav;

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      var data = localStorage.getItem('data');
      var token = localStorage.getItem('token');
      if (data && token) {
        this.userDataTemp = JSON.parse(data);
        this.token = JSON.parse(token);
        this.showShimmer = true;
        this.ClinetListing(token, 1, 10);
      }
    }
  }

  ClinetListing(token: any, page: any, limit: any) {
    this.api.GetAllClients(token).subscribe(
      (res: any) => {
        if (res.status == 200) {
          this.showShimmer = false;
          this.UserData = res.data;
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
      this.ClinetListing(this.token, this.nextPage, 10);
    }
  }

  closePopup() {
    this.is_popup = false;
  }

  save() {
    var data = {
      name: this.name,
      phone_number: this.phone_number,
      age: this.age,
      address: this.address,
      gender: this.gender,
      email: this.email,
    };
    if (this.is_update) {
      this.api.UpdateClient(data, this.token, this.update_id).subscribe(
        (res: any) => {
          if (res.status == 200) {
            this.snackbar.openFromComponent(SnackbarComponent, {
              data: res.message,
              duration: 1000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
              panelClass: ['success-bar'],
            });
            this.ClinetListing(this.token, 1, 10);
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
      this.api.CreateClient(data, this.token).subscribe(
        (res: any) => {
          if (res.status == 200) {
            this.snackbar.openFromComponent(SnackbarComponent, {
              data: res.message,
              duration: 1000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
              panelClass: ['success-bar'],
            });
            this.ClinetListing(this.token, 1, 10);
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
    this.name = data.name;
    this.phone_number = data.phone_number;
    this.age = data.age;
    this.address = data.address;
    this.gender = data.gender;
    (this.email = data.email), (this.is_update = true);
    this.index_id = index;
    this.drawer.toggle();
  }

  deleteUser(id: any) {
    this.delete_id = id;
    this.show_delete_poup = true + this.i;
    this.i++;
  }

  UserDelete(event: any) {
    this.api.DeleteClient(this.token, this.delete_id).subscribe((res: any) => {
      if (res.status == 200) {
        this.snackbar.openFromComponent(SnackbarComponent, {
          data: 'User has been soft deleted successfully.',
          duration: 1000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['success-bar'],
        });
        this.ClinetListing(this.token, 1, 10);
      }
    });
  }
}
