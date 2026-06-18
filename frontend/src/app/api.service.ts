import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseURL = 'http://localhost:3011/api';
  imageBaseURL = 'http://localhost:3011/';

  constructor(private http: HttpClient) {}

  public emit_to_header = new EventEmitter();
  public emit_to_breadcrumbs = new EventEmitter();
  public emit_to_header_filter = new EventEmitter();
  public emit_to_sideBar = new EventEmitter();

  // Login Api
  login(data: any) {
    return this.http.post(this.baseURL + '/login', data);
  }

  // Validate OTP Api
  validateOtp(data: any) {
    return this.http.post(this.baseURL + '/validate-otp', data);
  }

  // Users
  CreateUser(data: any, token: any) {
    let httpOptionswithtoken = {
      headers: new HttpHeaders({
        Token: token,
      }),
    };
    return this.http
      .post(this.baseURL + '/create-user', data, httpOptionswithtoken)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      );
  }

  GetAllUsers(token: any) {
    let httpOptionswithtoken = {
      headers: new HttpHeaders({
        Token: token,
      }),
    };
    return this.http
      .get(this.baseURL + '/get-all-users', httpOptionswithtoken)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      );
  }

  DeleteUser(token: any, id: any) {
    let httpOptionswithtoken = {
      headers: new HttpHeaders({
        Token: token,
      }),
    };
    return this.http
      .delete(this.baseURL + '/delete-users/' + id, httpOptionswithtoken)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      );
  }

  UpdateUser(data: any, token: any, id: any) {
    let httpOptionswithtoken = {
      headers: new HttpHeaders({
        Token: token,
      }),
    };
    return this.http
      .put(this.baseURL + '/update-users/' + id, data, httpOptionswithtoken)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      );
  }

  // Clients
  CreateClient(data: any, token: any) {
    let httpOptionswithtoken = {
      headers: new HttpHeaders({
        Token: token,
        'Content-Type': 'application/json',
      }),
    };
    return this.http
      .post(this.baseURL + '/create-client', data, httpOptionswithtoken)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      );
  }

  GetAllClients(token: any) {
    let httpOptionswithtoken = {
      headers: new HttpHeaders({
        Token: token,
      }),
    };
    return this.http
      .get(this.baseURL + '/get-all-clients', httpOptionswithtoken)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      );
  }

  DeleteClient(token: any, id: any) {
    let httpOptionswithtoken = {
      headers: new HttpHeaders({
        Token: token,
      }),
    };
    return this.http
      .delete(this.baseURL + '/delete-clients/' + id, httpOptionswithtoken)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      );
  }

  UpdateClient(data: any, token: any, id: any) {
    let httpOptionswithtoken = {
      headers: new HttpHeaders({
        Token: token,
        'Content-Type': 'application/json',
      }),
    };
    return this.http
      .put(this.baseURL + '/update-clients/' + id, data, httpOptionswithtoken)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      );
  }

  // Stock
  getAllStockType(token: any) {
    let httpOptionswithtoken = {
      headers: new HttpHeaders({
        Token: token,
      }),
    };
    return this.http
      .get(this.baseURL + '/get-stock-type', httpOptionswithtoken)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      );
  }

  CreateStock(data: any, token: any) {
    let httpOptionswithtoken = {
      headers: new HttpHeaders({
        Token: token,
        'Content-Type': 'application/json',
      }),
    };
    return this.http
      .post(this.baseURL + '/create-stock', data, httpOptionswithtoken)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      );
  }

  GetAllStocks(token: any) {
    let httpOptionswithtoken = {
      headers: new HttpHeaders({
        Token: token,
      }),
    };
    return this.http
      .get(this.baseURL + '/get-all-stocks', httpOptionswithtoken)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      );
  }

  DeleteStock(token: any, id: any) {
    let httpOptionswithtoken = {
      headers: new HttpHeaders({
        Token: token,
      }),
    };
    return this.http
      .delete(this.baseURL + '/delete-stocks/' + id, httpOptionswithtoken)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      );
  }

  UpdateStock(data: any, token: any, id: any) {
    let httpOptionswithtoken = {
      headers: new HttpHeaders({
        Token: token,
        'Content-Type': 'application/json',
      }),
    };
    return this.http
      .put(this.baseURL + '/update-stocks/' + id, data, httpOptionswithtoken)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      );
  }

  GetUnSoldStocks(token: any) {
    let httpOptionswithtoken = {
      headers: new HttpHeaders({
        Token: token,
      }),
    };
    return this.http
      .get(this.baseURL + '/get-unsold-stocks', httpOptionswithtoken)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      );
  }

  // Invoice
  CreateInvcoie(data: any, token: any) {
    let httpOptionswithtoken = {
      headers: new HttpHeaders({
        Token: token,
        'Content-Type': 'application/json',
      }),
    };
    return this.http
      .post(this.baseURL + '/create-invoice', data, httpOptionswithtoken)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      );
  }

  GetAllInvcoies(token: any, isoDate: any) {
    let httpOptionswithtoken = {
      headers: new HttpHeaders({
        Token: token,
      }),
    };
    return this.http
      .get(
        this.baseURL + `/get-all-invoice?startDate=${isoDate}`,
        httpOptionswithtoken
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      );
  }

  DeleteInvcoie(token: any, id: any) {
    let httpOptionswithtoken = {
      headers: new HttpHeaders({
        Token: token,
      }),
    };
    return this.http
      .delete(this.baseURL + '/delete-invcoies/' + id, httpOptionswithtoken)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      );
  }

  UpdateInvcoie(data: any, token: any, id: any) {
    let httpOptionswithtoken = {
      headers: new HttpHeaders({
        Token: token,
        'Content-Type': 'application/json',
      }),
    };
    return this.http
      .put(this.baseURL + '/update-invcoies/' + id, data, httpOptionswithtoken)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      );
  }

  // After login Event emit into Header Component
  HeaderChanges() {
    this.emit_to_header.emit(1);
  }

  // Set Breadcrumbs
  BreadcrumbsChanges(breadCrumbs: any, page_topic: any) {
    this.emit_to_breadcrumbs.emit({
      breadCrumbs: breadCrumbs,
      page_topic: page_topic,
    });
  }

  SideBarChanges(show_support: any) {
    this.emit_to_sideBar.emit(show_support);
  }
}
