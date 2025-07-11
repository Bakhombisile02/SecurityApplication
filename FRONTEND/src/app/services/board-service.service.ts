import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';

// Define a Board interface for type safety
interface Board {
  _id: string;
  title: string;
  description: string;
  departmentCode: string;
  __v: string; // Or number, depending on actual data type from backend
}

@Injectable({
  providedIn: 'root'
})
export class BoardServiceService {
  private apiUrl = `${environment.apiUrl}/posts`;
  private boarddisplay: Board[] = []; // Use Board interface
  private updatedboarddisplay = new Subject<Board[]>(); // Use Board interface
  private token: string = localStorage.getItem('token') || '';

  constructor(private http: HttpClient) { }

  getUpdateListener() {
    return this.updatedboarddisplay.asObservable();
  }


  getboard_service() {
    const headers = new HttpHeaders({
      'x-auth-token': this.token
    });
  
    // Expect an array of Board objects directly, matching backend
    this.http.get<Board[]>(this.apiUrl, { headers })
      .subscribe( (boards: Board[]) => { // Typed response
        console.log('All posts:', boards);
        this.boarddisplay = boards; // Correct assignment
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
