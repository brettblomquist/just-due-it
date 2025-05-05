import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppModule } from '../app.module';
import { ScheduleComponent } from "../schedule/schedule.component";

@Component({
  imports: [RouterLink, AppModule, RouterLink,],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {

}
