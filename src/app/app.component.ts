import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/@service/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Anti-Counterfeit-Frontend';
  get toggleSidebar() {
    return this.commonService.toggleSidebar;
  }

  constructor(private commonService: CommonService) { }
  ngOnInit(): void {
    this.commonService.toggleSideBar_Click();
  }


}
