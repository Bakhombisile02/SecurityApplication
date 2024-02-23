import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SignupServiceService } from '../services/signup-service.service'
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit
{
  
  constructor(public signupservice: SignupServiceService, private router: Router) {}

    
  ngOnInit(): void {
    
  }
    
  onsignup(SubmitForm: NgForm){
    if(SubmitForm.invalid)
    {
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordPattern.test(SubmitForm.value.password)) {
        alert('Password is not strong enough!');
        return;
      }
    
      alert('Invalid!')
      return
    }
    
    this.signupservice.signup_service(SubmitForm.value.username,SubmitForm.value.firstName,SubmitForm.value.lastName,SubmitForm.value.password)
    SubmitForm.resetForm()

    alert('User created!');
    this.router.navigate(['/login']);
  }

}