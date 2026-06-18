import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent {
  is_popup: boolean = false;

  @Output() is_delete = new EventEmitter();

  @Input() public set show_poup(value: any) {
    if (value != '' && value != undefined && value != null) {
      this.is_popup = value;
    }
  }

  closePopup() {
    this.is_popup = false;
  };
  deletePopup() {
    this.is_popup = false;
    this.is_delete.emit(true);
  }
}
