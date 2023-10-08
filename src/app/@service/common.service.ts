import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  toggleSidebar = "";

  constructor() { }

  toggleSideBar_Click() {
    if (this.toggleSidebar == "") {
      this.toggleSidebar = "toggle-sidebar";
    } else {
      this.toggleSidebar = "toggle-sidebar";
    }
  }
}
