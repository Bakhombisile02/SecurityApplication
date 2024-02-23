import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SignupServiceService {

  constructor(private http:HttpClient) { }

  signup_service(pusername:string, pfirstName:string, plastName:string, ppassword:string){
    const url = 'https://localhost:3000/api/user'
    this.http.post(url, {
      username:pusername,
      firstName:pfirstName,
      lastName:plastName,
      password:ppassword
    })
    .subscribe(response =>{console.log(response)})
  }
}
