import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css']
})

export class SnackbarComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any,private _snackRef: MatSnackBarRef<SnackbarComponent>) {}

  get message(): string {
    return this.data.message;
  }

  close(){
    this._snackRef.dismiss();
  }
}
