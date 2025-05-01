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
  fname: string = '';
  user: any = null;

  logout() {
    this.authService.logout();
  }



  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      this.user = user
    

    if (this.user?.displayName){
      this.fname = this.user.displayName.split(' ')[0];
    }
  })
  }


}
