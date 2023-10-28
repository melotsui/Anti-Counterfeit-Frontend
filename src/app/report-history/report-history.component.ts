import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/@service/common.service';

@Component({
  selector: 'app-report-history',
  templateUrl: './report-history.component.html',
  styleUrls: ['./report-history.component.css']
})
export class ReportHistoryComponent implements OnInit{

  constructor(private commonService: CommonService) { }

  ngOnInit(): void {
    console.log(this.commonService.refreshToken());
    this.loadReportHistory();
  }

  loadReportHistory(){
    console.log('loadReportHistory');
  }

}
