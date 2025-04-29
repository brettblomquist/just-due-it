import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {path: '', component: SignInComponent, title: 'Sign In'},
    {path:'sign-in', component: SignInComponent, title: 'Sign In'
    },
    {path:'sign-up-page', component: SignUpPageComponent, title: 'Sign Up'},
    {path:'home/:username', component: HomeComponent, title: 'Home'}

];
