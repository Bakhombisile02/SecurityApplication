import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BoardServiceService {

  private boarddisplay:{_id:string, title:string, description:string, departmentCode:string,__v:string }[] = [];
  private updatedboarddisplay = new Subject<{_id:string, title:string, description:string, departmentCode:string,__v:string}[]>();
  private token: string = localStorage.getItem('token') || '';

  constructor(private http: HttpClient) { }

  getUpdateListener() {
    return this.updatedboarddisplay.asObservable();
  }


  getboard_service() {
    const url = 'https://localhost:3000/api/posts';
    const headers = new HttpHeaders({
      'x-auth-token': this.token
    });
  
    this.http.get<{message: string, boards:any}>(url, { headers }) 
      .subscribe( (response: any) => {
        console.log('All posts:', response);
        this.boarddisplay = response ;
        this.updatedboarddisplay.next([...this.boarddisplay]);
      },
      (error: any) => {
        console.error('Error fetching boards:', error);
      });
  }
  

  deletePostById(boardId: string) {
    const url = `https://localhost:3000/api/posts/${boardId}`;
    const headers = new HttpHeaders({
      'x-auth-token': this.token
    });

    this.http.delete(url, { headers })
      .subscribe(
        (response: any) => {
          console.log(`Post with ID ${boardId} deleted successfully!`, response);
        },
        (error: any) => {
          console.error(`Error deleting post with ID ${boardId}:`, error);
        }
      );
  }
}
