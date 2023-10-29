import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/@service/common.service';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MsgBoxComponent } from './msg-box/msg-box.component';
import { CarouselModalComponent } from './carousel-modal/carousel-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Anti-Counterfeit-Frontend';
  dialogConfig = new MatDialogConfig();
  msgDialog: MatDialogRef<MsgBoxComponent, any> | undefined;
  carouselDialog: MatDialogRef<CarouselModalComponent, any> | undefined;
  matDialog: MatDialog;

  get toggleSidebar() {
    return this.commonService.toggleSidebar;
  }

  constructor(private commonService: CommonService, matDialog: MatDialog) {
    this.matDialog = matDialog;
  }

  ngOnInit(): void {
    this.commonService.toggleSideBar_Click();
    this.commonService.openMsgBoxEvent.subscribe((event: any) => {
      this.openMsgBox(event);
    });
    this.commonService.openCarouselEvent.subscribe((event: any) => {
      this.openCarousel(event);
    });
  }

  openCarousel(event: any) {
    this.dialogConfig.id = "CarouselModalComponent";
    this.dialogConfig.width = "60%";
    const params = {
      title: event.title,
      description: event.description,
      files: event.obj,
    };
    this.carouselDialog = this.matDialog.open(CarouselModalComponent, { ...this.dialogConfig, data: params });
  }

  openMsgBox(event: any) {
    console.log(event);
    this.dialogConfig.id = "MsgBoxComponent";
    this.dialogConfig.width = "400px";
    const params = {
      title: event.title,
      description: event.description,
    };
    this.msgDialog = this.matDialog.open(MsgBoxComponent, { ...this.dialogConfig, data: params });
  }
}
