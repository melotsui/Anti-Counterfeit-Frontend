import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/@service/common.service';
import { Location, DatePipe } from '@angular/common';

@Component({
  selector: 'app-detail-form',
  templateUrl: './report-detail.component.html',
  styleUrls: ['./report-detail.component.css']
})
export class ReportDetailComponent implements OnInit {
  @Output() callParent = new EventEmitter();
  report: any;
  userID: string | null = null;

  constructor(private location: Location, private router: Router, private route: ActivatedRoute, private http: HttpClient, private commonService: CommonService) { }
  ngOnInit(): void {
    this.userID = localStorage.getItem('userID') != null ? localStorage.getItem('userID') : '';
    this.route.queryParams.subscribe(params => {
      const report_id = params['report_id'];
      console.log('report_id', report_id); // You can use the token value as per your requirement
      if (report_id > 0) {

        this.http.get<any>('http://127.0.0.1:8000/api/reports/' + report_id).subscribe(
          (response) => {
            console.log(response);
            if (response.code == 200) {
              this.report = response.data.report;
              const datetime = response.data.report.created_at;
              const datepipe = new DatePipe('en-US');
              this.report.date = datepipe.transform(datetime, 'yyyy-MM-dd');
              this.report.time = datepipe.transform(datetime, 'HH:mm:ss');

            } else {
              this.router.navigate(['/not-found']);
            }
          },
          (error) => {
            this.router.navigate(['/not-found']);
            console.error('Login error', error);
          }
        );
      } else {
        this.router.navigate(['/not-found']);
      }
    });
  }

  openCarouselBox(title: string, description: string, obj: any | null = null) {
    // this.callParent.emit({ title: title, description: description, obj: obj });
    this.commonService.triggerOpenCarouselEvent(title, description, obj);
  }

  goBack(): void {
    this.location.back();
  }
  
  openMsgBox(title: string, description: string) {
    console.log(this.report);
    const obj = {
      action: "delete_report",
      formdata: this.report
    }
    this.commonService.triggerOpenMsgBoxEvent(title, description, obj);
  }


}


