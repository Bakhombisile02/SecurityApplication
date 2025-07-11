import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) { }

  login_service(pusername: string, ppassword: string) {
    return this.http.post<any>(this.apiUrl, {
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
