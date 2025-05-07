import { Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component'; 
import { HomeComponent } from './home/home.component';
import { TeacherDashboardComponent } from './teacher-dashboard/teacher-dashboard.component';
import { CoursePageComponent } from './course-page/course-page.component';
import { TeacherCoursePageComponent } from './teacher-course-page/teacher-course-page.component';
import { AssignmentPageComponent } from './assignment-page/assignment-page.component';


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
  { 
    path: 'home', 
    component: HomeComponent, 
    title: 'Home'    
  },
  { 
    path: 'teacher-dashboard', 
    component: TeacherDashboardComponent, 
    title: 'Dashboard'    
  },
  {
    path: 'course/:userId/:courseId',
    component: CoursePageComponent,
    title: 'Course Details'
  },
  { 
    path: 'teacher/course/:courseId', 
    component: TeacherCoursePageComponent, 
    title: 'Teacher Course Page' 
  },
  {
    path: 'courses/:courseId/assignments/:assignmentId',
    component: AssignmentPageComponent,
    title: 'Assignment'
  }

  
];
