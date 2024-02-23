import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginServiceService } from '../services/login-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  constructor(public loginService: LoginServiceService, private router: Router) {}

  ngOnInit(): void {
  }
  
  onLogin(loginForm: NgForm){
    if(loginForm.invalid) {
      alert('Invalid!')
      return;
    }
  
    this.loginService.login_service(loginForm.value.username, loginForm.value.password)
      .subscribe(
        (response) => {
          // Handle successful login response
          if (response && response.token) {
            const token = response.token;
            localStorage.setItem('token', token);
            alert('Login successful!');
            this.router.navigate(['/dashboard-viewall']);
          }
        },
        (error) => {
         
        }
      );
  
    loginForm.resetForm();
  }

}
