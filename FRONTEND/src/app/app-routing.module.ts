import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';
import { DashboardViewallComponent } from './dashboard/dashboard-viewall/dashboard-viewall.component';
import { DashboardPostComponent } from './dashboard/dashboard-post/dashboard-post.component';


const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard-viewall', component: DashboardViewallComponent },
  { path: 'dashboard-post', component: DashboardPostComponent},
  { path: '', redirectTo: '/welcome', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
