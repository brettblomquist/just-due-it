import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UserService, User } from '../user.service';
import { Router } from '@angular/router';
import { AuthService, UserInfo } from '../auth.service';

@Component({
  selector: 'app-sign-up-page',
  imports: [RouterLink, FormsModule],
  templateUrl: './sign-up-page.component.html',
  styleUrl: './sign-up-page.component.css'
})
export class SignUpPageComponent {
  user: UserInfo = {
    fname : '',
    lname : '',
    email : '',
    password : '',
    role: ''
  }

  private authService = inject(AuthService)

  selectRole(role: string): void {
    this.user.role = role;
  }

  signUp() {

    if (this.user.fname == '') {
      alert('Please enter your first name')
      return;
    }
    if (this.user.lname == '') {
      alert('Please enter your Last name')
      return;
    }

    if (this.user.email == '') {
      alert('Please enter email');
      return;
    }

    if (this.user.password == '') {
      alert('Please enter your password')
      return;
    }

    if (this.user.role == null){
      alert('Please select your role')
      return;
    }

    this.authService.register(this.user);
    this.user = {
    fname : '',
    lname : '',
    email : '',
    password : '',
    role: ''
    }

  }
}
