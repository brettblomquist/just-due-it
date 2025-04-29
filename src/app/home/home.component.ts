import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  username: string | null = '';

  constructor(private route: ActivatedRoute) {
    this.username = this.route.snapshot.paramMap.get('username');
  }
}
