import { Component, ElementRef, OnInit, ViewChild, Renderer2, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { SnackbarComponent } from '../snackbar/snackbar.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  email: string = '';
  show_email_error: boolean = false;
  show_otp_error: boolean = false;
  login: boolean = true;
  is_timer: boolean = false;
  resend_otp: boolean = false;
  opt: any = { input1: '', input2: '', input3: '', input4: '', input5: '', input6: '', };
  display: any;
  opt_error: any = 'Please Enter OTP has been sent to your registered email.';
  opt_button: any = 'Continue';

  @ViewChild('myInput1', { static: false })
  myInput1!: ElementRef;
  @ViewChild('myInput2', { static: false })
  myInput2!: ElementRef;
  @ViewChild('myInput3', { static: false })
  myInput3!: ElementRef;
  @ViewChild('myInput4', { static: false })
  myInput4!: ElementRef;
  @ViewChild('myInput5', { static: false })
  myInput5!: ElementRef;
  @ViewChild('myInput6', { static: false })
  myInput6!: ElementRef;

  constructor(private api: ApiService, private _snackBar: MatSnackBar, private router: Router, private app: AppComponent, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      var data = localStorage.getItem("data");
      if (data) {
        this.router.navigate(['/dashboard']);
      }
    }
  }

  ngAfterViewInit() {
    if (!this.login) {
      setTimeout(() => {
        this.myInput1.nativeElement.focus();
      });
    }
  }

  submit() {
    if (this.login || this.resend_otp) {
      this.resend_otp = false;
      this.opt_button = "Continue";
      this.opt = { input1: '', input2: '', input3: '', input4: '', input5: '', input6: '', };
      if (this.email != "") {
        this.show_email_error = false;
        var data = {
          email: this.email,
        }
        this.api.login(data).subscribe((res: any) => {
          if (res.status == 200) {
            this.snackbar.openFromComponent(SnackbarComponent, {
              data: res.message,
              duration: 1000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
              panelClass: ['success-bar'],
            });
            this.login = false;
            this.is_timer = true;
            this.timer(10);
            if (!this.login) {
              setTimeout(() => {
                this.myInput1.nativeElement.focus();
              });
            }
          } else {
            this.snackbar.openFromComponent(SnackbarComponent, {
              data: res.message,
              duration: 1000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
              panelClass: ['error-bar'],
            });
          }
        }, (error: any) => {
          let errMsg = 'Connection error. Make sure the backend server is running.';
          if (error.error && error.error.message) {
            errMsg = error.error.message;
          } else if (error.message) {
            errMsg = error.message;
          }
          this.snackbar.openFromComponent(SnackbarComponent, {
            data: errMsg,
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['error-bar'],
          });
        })
      } else {
        if (this.email == "" || this.email == null || this.email == undefined) {
          this.show_email_error = true;
        }
      }
    } else {
      if (this.opt.input1 !== "" &&
        this.opt.input2 !== "" &&
        this.opt.input3 !== "" &&
        this.opt.input4 !== "" &&
        this.opt.input5 !== "" &&
        this.opt.input6 !== "") {
        this.show_otp_error = false;
        const inputArray = Object.values(this.opt);
        var data1 = {
          otp: parseInt(inputArray.join("")),
          email: this.email,
        }
        this.api.validateOtp(data1).subscribe((res: any) => {
          if (res.status == 200) {
            if (res) {
              this.snackbar.openFromComponent(SnackbarComponent, {
                data: res.message,
                duration: 1000,
                horizontalPosition: 'right',
                verticalPosition: 'top',
                panelClass: ['success-bar'],
              });
              localStorage.setItem('data', JSON.stringify(res.data));
              localStorage.setItem('token', JSON.stringify(res.token));
              this.api.HeaderChanges();
              this.app.login = true;
              if (res.data.role == 'Admin') {
                this.router.navigate(['/users-list']);
              } else {
                this.router.navigate(['/stock-list']);
              }
            }
          } else {
            this.snackbar.openFromComponent(SnackbarComponent, {
              data: res.message,
              duration: 1000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
              panelClass: ['error-bar'],
            });
          }
        }, (error: any) => {
          let errMsg = 'Connection error. Make sure the backend server is running.';
          if (error.error && error.error.message) {
            errMsg = error.error.message;
          } else if (error.message) {
            errMsg = error.message;
          }
          this.snackbar.openFromComponent(SnackbarComponent, {
            data: errMsg,
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['error-bar'],
          });
        })
      } else {
        this.show_otp_error = true;
      }
    }
  }

  onNumericInput(event: any, type: any): void {
    if (type == "input1") {
      if (event.inputType == "insertText") {
        setTimeout(() => {
          this.myInput2.nativeElement.focus();
        });
      }
    } else if (type == "input2") {
      if (event.inputType == "insertText") {
        setTimeout(() => {
          this.myInput3.nativeElement.focus();
        });
      }
    } else if (type == "input3") {
      if (event.inputType == "insertText") {
        setTimeout(() => {
          this.myInput4.nativeElement.focus();
        });
      }
    } else if (type == "input4") {
      if (event.inputType == "insertText") {
        setTimeout(() => {
          this.myInput5.nativeElement.focus();
        });
      }
    } else if (type == "input5") {
      if (event.inputType == "insertText") {
        setTimeout(() => {
          this.myInput6.nativeElement.focus();
        });
      }
    }
  }

  onPaste(event: any, type: any) {
    event.preventDefault();
    const pastedText = event.clipboardData.getData('text');
    const digitsArray = pastedText.split('');
    if (type == "input1") {
      this.opt = {
        input1: digitsArray[0],
        input2: digitsArray[1],
        input3: digitsArray[2],
        input4: digitsArray[3],
        input5: digitsArray[4],
        input6: digitsArray[5],
      };
    } else if (type == "input2") {
      this.opt = {
        input1: this.opt.input1,
        input2: digitsArray[0],
        input3: digitsArray[1],
        input4: digitsArray[2],
        input5: digitsArray[3],
        input6: digitsArray[4],
      };
    } else if (type == "input3") {
      this.opt = {
        input1: this.opt.input1,
        input2: this.opt.input2,
        input3: digitsArray[0],
        input4: digitsArray[1],
        input5: digitsArray[2],
        input6: digitsArray[3],
      };
    } else if (type == "input4") {
      this.opt = {
        input1: this.opt.input1,
        input2: this.opt.input2,
        input3: this.opt.input3,
        input4: digitsArray[0],
        input5: digitsArray[1],
        input6: digitsArray[2],
      };
    } else if (type == "input5") {
      this.opt = {
        input1: this.opt.input1,
        input2: this.opt.input2,
        input3: this.opt.input3,
        input4: this.opt.input4,
        input5: digitsArray[0],
        input6: digitsArray[1],
      };
    } else if (type == "input6") {
      this.opt = {
        input1: this.opt.input1,
        input2: this.opt.input2,
        input3: this.opt.input3,
        input4: this.opt.input4,
        input5: this.opt.input5,
        input6: digitsArray[0],
      };
    }
  }

  timer(minute: any) {
    let seconds: number = minute * 60;
    let textSec: any = '0';
    let statSec: number = 60;
    const prefix = minute < 10 ? '0' : '';
    const timer = setInterval(() => {
      seconds--;
      if (statSec != 0) statSec--;
      else statSec = 59;
      if (statSec < 10) {
        textSec = '0' + statSec;
      } else textSec = statSec;
      this.display = `${prefix}${Math.floor(seconds / 60)}:${textSec}`;
      if (seconds == 0) {
        clearInterval(timer);
        this.opt_button = 'Resend OTP';
        this.is_timer = false;
        this.resend_otp = true;
      }
    }, 1000);
  }

}
