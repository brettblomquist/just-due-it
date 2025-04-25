import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';

export const routes: Routes = [
    {path: '', component: SignInComponent, title: 'Sign In'},
    {path:'sign-in', component: SignInComponent, title: 'Sign In'
    },
    {path:'sign-up-page', component: SignUpPageComponent, title: 'Sign Up'},

];
