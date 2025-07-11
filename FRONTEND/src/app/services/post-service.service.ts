import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostServiceService {
  private apiUrl = `${environment.apiUrl}/posts`;
  private token: string = localStorage.getItem('token') || '';


  constructor(private http:HttpClient) { }

  addboardpost_service(ptitle: string, pdescription: string, pdepartmentCode: string){
    const headers = new HttpHeaders({
      'x-auth-token': this.token
    })

   this.http.post(this.apiUrl, {
      title: ptitle,
      description: pdescription,
      departmentCode: pdepartmentCode
    }, {headers}).subscribe(
      (response) => {
        // Handle successful post creation
        console.log('Post created successfully!', response); // Log full response for debugging
        alert('Post created successfully!'); // User-facing alert
      },
      (error) => {
        // Handle post creation errors here
        alert('Post creation failed. Please try again later.');
      }
    )
  }
}
