import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  toggleSidebar = "";
  openMsgBoxEvent: EventEmitter<any> = new EventEmitter<any>();
  openCarouselEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  triggerOpenMsgBoxEvent(title: string, description: string, obj: any | null = null) {
    const event = {
      title: title,
      description: description,
      obj: obj
    };
    this.openMsgBoxEvent.emit(event);
  }

  triggerOpenCarouselEvent(title: string, description: string, obj: any | null = null) {
    const event = {
      title: title,
      description: description,
      obj: obj
    };
    this.openCarouselEvent.emit(event);
  }

  toggleSideBar_Click() {
    if (this.toggleSidebar == "") {
      this.toggleSidebar = "toggle-sidebar";
    } else {
      this.toggleSidebar = "toggle-sidebar";
    }
  }

}
