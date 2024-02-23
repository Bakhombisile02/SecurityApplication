import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {
  constructor(private router: Router) { }

  goToSignUp() {
    this.router.navigate(['/signup']); // Assuming you have a route named 'signup'
  }

  goToLogin() {
    this.router.navigate(['/login']); // Assuming you have a route named 'login'
  }

}
