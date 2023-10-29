import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/@service/common.service';
import { ActivatedRoute, Router, RouteConfigLoadEnd, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-report-history',
  templateUrl: './report-history.component.html',
  styleUrls: ['./report-history.component.css']
})
export class ReportHistoryComponent implements OnInit {
  reports: any[] = [];

  constructor(private router: Router, private http: HttpClient, private commonService: CommonService) { }

  ngOnInit(): void {
    this.loadReportHistory();
  }

  loadReportHistory() {
    const accessToken = localStorage.getItem('accessToken');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`
    });
    const apiUrl = `http://127.0.0.1:8000/api/reports/history`;
    this.http.post<any>(apiUrl, null, { headers })
      .subscribe(response => {
        console.log(response);
        this.reports = response.data.reports;
      },
      (error) => {
        localStorage.setItem('islogin', "0");
        this.router.navigate(['/login']);
        console.error('Login error', error);
      });
  }

}
