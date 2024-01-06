import { Injectable, EventEmitter, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CommonService implements OnInit {
  toggleSidebar = "";
  openMsgBoxEvent: EventEmitter<any> = new EventEmitter<any>();
  openCarouselEvent: EventEmitter<any> = new EventEmitter<any>();
  userInfo: any = null;

  constructor(private router: Router, private http: HttpClient) { }
  ngOnInit(): void {
  }

  triggerOpenMsgBoxEvent(title: string, description: string, obj: any | null = null) {
    const event = {
      title: title,
      description: description,
      obj: obj
    };
    console.log("ABABABABABAB", event)
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
          return true;
        } else {
          return false;
        }
      }),
      catchError((error) => {
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

  refreshToken() {
    const accessToken = localStorage.getItem('accessToken');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`
    });

    this.http.post<any>('http://127.0.0.1:8000/api/refresh', null, { headers }).subscribe(
      (response) => {
        console.log(response);
        const accessToken = response.data.access_token;

        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('islogin', "1");

      },
      (error) => {
        localStorage.setItem('islogin', "0");
        this.router.navigate(['/login']);
        console.error('Login error', error);
      }
    );
  }

  logout() {
    console.log('logout');
    localStorage.setItem('accessToken', "");
    localStorage.setItem('islogin', "0");
    // this.router.navigate(['/']);
    location.reload();
  }

  // submitForm(formData: any) {
  //   const accessToken = localStorage.getItem('accessToken');

  //   const headers = new HttpHeaders({
  //     Authorization: `Bearer ${accessToken}`,
  //     'Content-Type': 'application/json'
  //   });

  //   this.http.post<any>('http://127.0.0.1:8000/api/reports', JSON.stringify(formData), { headers })
  //     .subscribe(data => {
  //       if (data.code == 200) {
  //         console.log('Report created successfully:', data);

  //       } else {
  //         console.error('Error creating report:', data.message);
  //         alert(data.message);
  //       }
  //       // Handle the success response
  //     }, error => {
  //       console.error('Error creating report:', error);
  //       alert(error.message);
  //     });

  // }

  // uploadImage(image: File) {
  //   const accessToken = localStorage.getItem('accessToken');

  //   const headers = new HttpHeaders({
  //     Authorization: `Bearer ${accessToken}`
  //   });

  //   const formData = new FormData();
  //   formData.append('image', image);

  //   return this.http.post<any>('http://
  // }
}
