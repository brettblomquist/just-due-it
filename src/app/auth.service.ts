import { inject, Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, GoogleAuthProvider, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateCurrentUser, updatePhoneNumber, updateProfile, User } from '@angular/fire/auth';
import { Router } from '@angular/router';

export interface UserInfo{
  fname: string,
  lname: string,
  email: string,
  password: string,
  role: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private auth = inject(Auth);
  private router = inject(Router);

  login(email: string, password: string) {
    signInWithEmailAndPassword(this.auth, email, password).then(() => {
      localStorage.setItem('token', 'true');
      this.router.navigate(['/home'])
    }, err => {
      alert(`Something went wrong: ${err.message} `);
      this.router.navigate(['/sign-in'])
    })
  }

  register(aUser: UserInfo) {
    createUserWithEmailAndPassword(this.auth, aUser.email, aUser.password)
      .then(res => {
        const user: User = res.user;
        const displayName = aUser.fname + ' ' + aUser.lname;
        updateProfile(user, { displayName });
        alert('Registration Successful')
        this.router.navigate(['/sign-in'])
      })
      .catch(err => {
      alert(err.message)
      this.router.navigate(['/sign-up-page'])
      })

   updateProfile
    
  }

  logout(){
    signOut(this.auth)
      .then(() => {
        localStorage.removeItem('token');
        this.router.navigate(['/sign-in'])
      })
      .catch(err => {
        alert(err.message);
      })
  }

  // forgotPassword(email: string) {
  //   sendPasswordResetEmail(this.auth, email)
  //     .then(() => {
  //       this.router.navigate(['/verify-email']);
  //     })
  //     .catch( err => {
  //       alert(`Something went wrong: ${ err.message }`);
  //     })
  // }

  // signInWithGoogle() {
  //   signInWithPopup(this.auth, new GoogleAuthProvider())
  //     .then(res => {
  //       this.router.navigate(['/home']);
  //       localStorage.setItem('token', JSON.stringify(res.user))
  //     })
  //     .catch( err => {
  //       alert(err.message);
  //     })
  // }

  getUser(): User | null {
    return this.auth.currentUser;
  }


}
