import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/@service/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  isLogin: boolean | null = null;

  constructor(private router: Router, private commonService: CommonService) { 
    if(localStorage.getItem('islogin') == '1'){
      this.isLogin = true;
    }
  }

  ngOnInit(): void {
  }

  login(){
    this.router.navigate(['/login']);
  }

  logout(){
    this.commonService.logout();
  }

  toggleSideBar_Click() {
    this.commonService.toggleSideBar_Click();
  }
}
