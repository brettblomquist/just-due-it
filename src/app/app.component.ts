import { Component, inject } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { User, UserService } from './user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [SignInComponent, RouterLink, RouterModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'just-due-it';

  userService = inject(UserService)
  user: User = {id: '', username: '', password: '', role: ''}
  users: User[] = []

  ngOnInit(){
    this.userService.getUsers().subscribe(data => this.users = data);
  }

  addUser(){
    this.userService.addUser(this.user)
  }

  resetForm(){
    this.user = {
      id: '',
      username: '',
      password: '',
      role: '',
    }
  }
}
