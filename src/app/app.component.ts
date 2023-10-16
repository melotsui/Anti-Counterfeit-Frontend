import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/@service/common.service';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MsgBoxComponent } from './msg-box/msg-box.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Anti-Counterfeit-Frontend';
  dialogConfig = new MatDialogConfig();
  modalDialog: MatDialogRef<MsgBoxComponent, any> | undefined;
  matDialog: MatDialog;

  get toggleSidebar() {
    return this.commonService.toggleSidebar;
  }

  constructor(private commonService: CommonService, matDialog: MatDialog) {
    this.matDialog = matDialog;
  }
  
  ngOnInit(): void {
    this.commonService.toggleSideBar_Click();
  }

  openMsgBox() {
    this.dialogConfig.id = "MsgBoxComponent";
    this.dialogConfig.width = "650px";
    this.modalDialog = this.matDialog.open(MsgBoxComponent, this.dialogConfig);
  }
}
