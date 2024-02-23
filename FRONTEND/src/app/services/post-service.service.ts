import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PostServiceService {
  private token: string = localStorage.getItem('token') || '';


  constructor(private http:HttpClient) { }

  addboardpost_service(ptitle: string, pdescription: string, pdepartmentCode: string){
    const headers = new HttpHeaders({
      'x-auth-token': this.token
    })
    const url = 'https://localhost:3000/api/posts'

   this.http.post(url, {
      title: ptitle,
      description: pdescription,
      departmentCode: pdepartmentCode
    }, {headers}).subscribe(
      (response) => {
        // Handle successful post creation
        console.log(`Post ${response} created successfully!`)
        alert(`Post ${response} created successfully!`);
      },
      (error) => {
        // Handle post creation errors here
        alert('Post creation failed. Please try again later.');
      }
    )
  }
}
