import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BoardServiceService {
  private apiUrl = `${environment.apiUrl}/posts`;
  private boarddisplay:{_id:string, title:string, description:string, departmentCode:string,__v:string }[] = [];
  private updatedboarddisplay = new Subject<{_id:string, title:string, description:string, departmentCode:string,__v:string}[]>();
  private token: string = localStorage.getItem('token') || '';

  constructor(private http: HttpClient) { }

  getUpdateListener() {
    return this.updatedboarddisplay.asObservable();
  }


  getboard_service() {
    const headers = new HttpHeaders({
      'x-auth-token': this.token
    });
  
    this.http.get<{message: string, boards:any}>(this.apiUrl, { headers })
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
    const url = `${this.apiUrl}/${boardId}`;
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
