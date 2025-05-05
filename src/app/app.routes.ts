import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { EditorComponent } from './schedule/editor/editor.component';

export const routes: Routes = [
    {path: '', component: SignInComponent, title: 'Sign In'},
    {path:'sign-in', component: SignInComponent, title: 'Sign In'
    },
    {path:'sign-up-page', component: SignUpPageComponent, title: 'Sign Up'},
    {path: 'schedule', component: ScheduleComponent, title: 'Schedule'},
    {path: 'schedule-editor', component: EditorComponent, title: 'Schedule Editor'},
];
