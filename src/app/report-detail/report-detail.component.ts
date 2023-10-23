import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { CommonService } from 'src/app/@service/common.service';

@Component({
  selector: 'app-detail-form',
  templateUrl: './report-detail.component.html',
  styleUrls: ['./report-detail.component.css']
})
export class ReportDetailComponent {
  @Output() callParent = new EventEmitter();

  constructor(private commonService: CommonService) { }

  openCarouselBox(title: string, description: string, obj: any | null = null) {
    // this.callParent.emit({ title: title, description: description, obj: obj });
    this.commonService.triggerOpenCarouselEvent(title, description, obj);
  }
}
