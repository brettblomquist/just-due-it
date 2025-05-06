import { Component, inject, signal } from '@angular/core';
import { addDoc, Firestore, collection } from '@angular/fire/firestore';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-teacher-dashboard',
  imports: [FormsModule],
  templateUrl: './teacher-dashboard.component.html',
  styleUrl: './teacher-dashboard.component.css'
})
export class TeacherDashboardComponent {
private firestore = inject(Firestore);
private authService = inject(AuthService);
isAddingCourse = signal(false);

newCourse = { title: '', description: ''};
joinCode: string | null = null;

toggleIsAddingCourse(): void{
  this.isAddingCourse.set(!this.isAddingCourse());
}

generateCode(): string {
  return Math.random().toString(36).substring(2, 8)
}

createCourse() {
  const teacherId = this.authService.user$.subscribe((user) => {
    const teacherId = user?.uid;
    const code = this.generateCode();
    const coursesCollection = collection(this.firestore, 'courses');
    addDoc(coursesCollection, {
      title: this.newCourse.title,
      description: this.newCourse.description,
      teacherId: teacherId,
      code: code,
      students: [],
    })
  })
}
}