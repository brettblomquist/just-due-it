import { Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component'; 
//import { TeacherDashboardComponent } from './pages/teacher-dashboard/teacher-dashboard.component';
import { HomeComponent } from './home/home.component';


export const routes: Routes = [
  { 
    path: '', 
    component: SignInComponent, 
    title: 'Sign In' 
  },
  { 
    path: 'sign-in', 
    component: SignInComponent, 
    title: 'Sign In' 
  },
  { 
    path: 'sign-up-page', 
    component: SignUpPageComponent, 
    title: 'Sign Up' 
  },
  { 
    path: 'admin-dashboard', 
    component: AdminDashboardComponent, 
    title: 'Admin Dashboard'    
  },
  
];
