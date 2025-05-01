import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-in',
  imports: [RouterLink, FormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {

  private authService = inject(AuthService);

  email = '';
  password = '';

  login() {
    if (this.email == '') {
      alert('Please enter email');
      return;
    }

    if (this.password == ''){
      alert('Please enter your password')
      return;
    }

    this.authService.login(this.email, this.password);
    this.email = '';
    this.password = '';

  }

  // signInWithGoogle() {
  //   this.authService.signInWithGoogle()
  // }

  }

