import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http: HttpClient) { }

  login_service(pusername: string, ppassword: string) {
    const url = 'https://localhost:3000/api/auth';

    return this.http.post<any>(url, {
      username: pusername,
      password: ppassword
    })
    .pipe(
      catchError(error => {
        // Handle login error (401 Unauthorized)
        if (error.status === 401) {
          alert('Invalid username or password');
        }
        return throwError(error);
      })
    );
  }
}
