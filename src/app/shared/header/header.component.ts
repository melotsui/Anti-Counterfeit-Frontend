import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/@service/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLogin: boolean | null = null;
  userName: string | null = null;
  iconStr: string | undefined = undefined;

  constructor(private router: Router, private commonService: CommonService) {
    if (localStorage.getItem('islogin') == '1') {
      this.isLogin = true;
    }
    this.userName = localStorage.getItem('userName') != null ? localStorage.getItem('userName') : '';
    this.iconStr = this.userName?.substring(0, 1);
    console.log('userName', this.userName);
  }

  ngOnInit(): void {
  }

  login() {
    this.router.navigate(['/login']);
  }

  logout() {
    this.commonService.logout();
  }

  toggleSideBar_Click() {
    this.commonService.toggleSideBar_Click();
  }
}
