import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  private authService = inject(AuthService);

  logout() {
    this.authService.logout();
  }

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      this.user = user
    })
  }



  user = this.authService.getUser();
}
