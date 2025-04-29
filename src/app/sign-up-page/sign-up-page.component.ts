import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UserService, User } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up-page',
  imports: [RouterLink, FormsModule],
  templateUrl: './sign-up-page.component.html',
  styleUrl: './sign-up-page.component.css'
})
export class SignUpPageComponent {
  user = {
    id: '',
    username: '',
    password: '',
    role: ''
  }

  selectRole(role: string){
    this.user.role = role
    console.log('Role switched to: ' + role)
  }

  constructor(private userService: UserService, private router: Router){}

  signUp(): void {
    this.userService.addUser(this.user)
    this.router.navigate(['/home', this.user.username])
  };


}
