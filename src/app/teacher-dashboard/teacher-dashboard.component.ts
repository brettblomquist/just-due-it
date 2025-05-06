import { Component, inject, signal } from '@angular/core';
import { addDoc, Firestore, collection, where, query, collectionData } from '@angular/fire/firestore';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teacher-dashboard',
  imports: [FormsModule],
  templateUrl: './teacher-dashboard.component.html',
  styleUrl: './teacher-dashboard.component.css'
})
export class TeacherDashboardComponent {
private firestore = inject(Firestore);
private authService = inject(AuthService);
private router = inject(Router);
isAddingCourse = signal(false);
teacherCourses: any[] = [];

newCourse = { title: '', description: ''};
joinCode: string | null = null;

ngOnInit(): void {
  this.authService.user$.subscribe((user) => {
    const teacherId = user?.uid;
    const coursesCollection = collection(this.firestore, 'courses');
    const teacherCoursesQuery = query(coursesCollection, where('teacherId', '==', teacherId));
    collectionData(teacherCoursesQuery, {idField: 'id'}).subscribe((courses) => {
      this.teacherCourses = courses;
    })
})
}

toggleIsAddingCourse(): void{
  this.isAddingCourse.set(!this.isAddingCourse());
}

generateCode(): string {
  return Math.random().toString(36).substring(2, 8)
}

goToCourse(courseId: string): void {
  this.router.navigate(['/teacher/course', courseId])
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