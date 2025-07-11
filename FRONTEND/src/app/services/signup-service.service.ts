import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignupServiceService {
  private apiUrl = `${environment.apiUrl}/user`;

  constructor(private http:HttpClient) { }

  signup_service(pusername:string, pfirstName:string, plastName:string, ppassword:string){
    this.http.post(this.apiUrl, {
      username:pusername,
      firstName:pfirstName,
      lastName:plastName,
      password:ppassword
    })
    .subscribe(response =>{console.log(response)})
  }
}
