import { Injectable, EventEmitter, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommonService implements OnInit{
  toggleSidebar = "";
  openMsgBoxEvent: EventEmitter<any> = new EventEmitter<any>();
  openCarouselEvent: EventEmitter<any> = new EventEmitter<any>();
  isLogin: boolean = false;
  userInfo: any = null;

  constructor(private http: HttpClient) { }
  ngOnInit(): void {
  }

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

  checkLogin(): Observable<boolean> {
    const accessToken = localStorage.getItem('accessToken');

    return this.me().pipe(
      map((response) => {
        if (response.code == 200) {
          this.userInfo = response.data;
          this.isLogin = true;
          return true;
        } else {
          this.isLogin = false;
          return false;
        }
      }),
      catchError((error) => {
        this.isLogin = false;
        return of(false);
      })
    );
  }

  me(): Observable<any> {
    const accessToken = localStorage.getItem('accessToken');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`
    });

    return this.http.post<any>('http://127.0.0.1:8000/api/me', null, { headers });
  }

  refreshToken(): Observable<string> | null {
    const accessToken = localStorage.getItem('accessToken');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`
    });

    return this.http.post<any>('http://127.0.0.1:8000/api/refresh', null, { headers }).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }

}
