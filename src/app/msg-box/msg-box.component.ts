import { Component, OnInit, Input, EventEmitter, Output, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-msg-box',
  templateUrl: './msg-box.component.html',
  styleUrls: ['./msg-box.component.css']
})
export class MsgBoxComponent {
  dialogRef: MatDialogRef<MsgBoxComponent>;
  data: any;

  constructor(dialogRef: MatDialogRef<MsgBoxComponent>, @Inject(MAT_DIALOG_DATA) data: any){
    this.dialogRef = dialogRef;
    this.data = data;
  }

  close(){
    this.dialogRef.close();
  }
}
