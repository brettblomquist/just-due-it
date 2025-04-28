import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})

export class AdminDashboardComponent {
  constructor(private router: Router) {} 

  users = [
    { name: 'Bob', studentId: '1111111', email: 'bob@gmail.com', phone: '111-111-1111' },
    { name: 'Ben', studentId: '2222222', email: 'ben@gmail.com', phone: '222-222-2222' },
    { name: 'Kai', studentId: '3333333', email: 'kai@gmail.com', phone: '333-333-3333' },
    { name: '', studentId: '', email: '', phone: '' },
    { name: '', studentId: '', email: '', phone: '' },
    { name: '', studentId: '', email: '', phone: '' },
    { name: '', studentId: '', email: '', phone: '' },
    { name: '', studentId: '', email: '', phone: '' }
  ];

  selectedUserIndex: number | null = null;
  editedUser = { name: '', studentId: '', email: '', phone: '' };
  showEditModal = false;

  removeUser(index: number) {
    this.users.splice(index, 1);
  }

  openEditModal(index: number) {
    this.selectedUserIndex = index;
    this.editedUser = { ...this.users[index] };
    this.showEditModal = true;
  }

  saveEdit() {
    if (this.selectedUserIndex !== null) {
      this.users[this.selectedUserIndex] = { ...this.editedUser };
    }
    this.showEditModal = false;
  }

  logout() {
    window.location.href = '/sign-in'; 
  }

  goToTeacherDashboard() {
    this.router.navigate(['/teacher-dashboard']); 
  }

}
