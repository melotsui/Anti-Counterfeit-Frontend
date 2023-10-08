import { Component } from '@angular/core';
import { CommonService } from 'src/app/@service/common.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private commonService: CommonService) { 
    
  }

  toggleSideBar_Click() {
    this.commonService.toggleSideBar_Click();
  }
}
