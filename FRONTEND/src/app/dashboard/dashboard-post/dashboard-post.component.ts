import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostServiceService } from "../../services/post-service.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-post',
  templateUrl: './dashboard-post.component.html',
  styleUrls: ['./dashboard-post.component.css']
})
export class DashboardPostComponent implements OnInit{

  ngOnInit(): void {
  }

  constructor(public postservices: PostServiceService, private router: Router) {}

  onSubmit(postform: NgForm){
    if(postform.invalid) {
      alert('Invalid!')
      return;
    }
    
    this.postservices.addboardpost_service(postform.value.title, postform.value.description, postform.value.department)

    this.router.navigate(['/dashboard-viewall']);

    
  }
}
