import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BoardServiceService } from '../../services/board-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-viewall',
  templateUrl: './dashboard-viewall.component.html',
  styleUrls: ['./dashboard-viewall.component.css']
})
export class DashboardViewallComponent implements OnInit {

  boards: {_id: string, title: string, description: string, departmentCode: string, __v: string}[] = [];
  private boardSubscription!: Subscription;

  constructor(public boardService: BoardServiceService, private router: Router) {}

  ngOnInit() {
    this.boardService. getboard_service(); 
    this.boardSubscription = this.boardService.getUpdateListener()
      .subscribe((Boards) => {
        this.boards = Boards;
      });
      
  }

  ngOnDestroy() {
    this.boardSubscription.unsubscribe();
  }

  onDelete(boardId: string) {
    const confirmDelete = confirm("Are you sure you want to delete this post?");
    
    if (confirmDelete) {
        this.boardService.deletePostById(boardId); // Make sure this function exists in your BoardServiceService
        alert(`Post with ID ${boardId} deleted successfully!`)
        location.reload(); // This will refresh the page
    }
}
  goToPost() {
    this.router.navigate(['/dashboard-post']); // Assuming you have a route named 'signup'
  }

  goLogOut(){
    const confirmLogout = confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.removeItem('token');
    this.router.navigate(['/welcome']);
    }
  }

}
