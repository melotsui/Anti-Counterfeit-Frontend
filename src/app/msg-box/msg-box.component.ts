import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-msg-box',
  templateUrl: './msg-box.component.html',
  styleUrls: ['./msg-box.component.css']
})
export class MsgBoxComponent {
  dialogRef: MatDialogRef<MsgBoxComponent>;

  constructor(dialogRef: MatDialogRef<MsgBoxComponent>){
    this.dialogRef = dialogRef;
  }

  close(){
    this.dialogRef.close();
  }
}
