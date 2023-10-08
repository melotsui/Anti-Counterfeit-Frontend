import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  sideBarForm: FormGroup;

  constructor(fb: FormBuilder){
    this.sideBarForm = fb.group({
      // 'search_name': '',
      // 'search_region': '',
      // 'search_district': '',
    });
  }

  ngOnInit(): void {

  }

}
