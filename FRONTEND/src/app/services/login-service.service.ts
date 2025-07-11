import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { catchError } from 'rxjs/operators'; // Removed unused import
// import { throwError } from 'rxjs'; // Removed unused import
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
    });
    // Removed .pipe and catchError logic as it was the only use of these imports.
    // Error handling can be done in the component subscribing to this service.
  }
}
