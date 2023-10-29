import { Component, OnInit, Input, EventEmitter, Output, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-carousel-modal',
  templateUrl: './carousel-modal.component.html',
  styleUrls: ['./carousel-modal.component.css']
})
export class CarouselModalComponent {
  dialogRef: MatDialogRef<CarouselModalComponent>;
  data: any;
  files: any[] = [];

  constructor(dialogRef: MatDialogRef<CarouselModalComponent>, @Inject(MAT_DIALOG_DATA) data: any){
    this.dialogRef = dialogRef;
    this.data = data;
    this.files = data.files;
    console.log(data);
  }

}
