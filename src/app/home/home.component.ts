import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Firestore, collection, collectionData, doc, addDoc } from '@angular/fire/firestore';


@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  private authService = inject(AuthService);
  private firestore = inject(Firestore);
  private router = inject(Router);
  fname: string = '';
  user: any = null;
  courses: any[] = [];
  newCourse = { title: '' }
  isAddingCourse = signal(false);

  logout() {
    this.authService.logout();
  }

  toggleAddCourseView(){
    this.isAddingCourse.set(!this.isAddingCourse());
  }

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      this.user = user
    

    if (this.user?.displayName){
      this.fname = this.user.displayName.split(' ')[0];
    }

    if (this.user?.uid) {
      const coursesCollection = collection(this.firestore, `users/${this.user.uid}/courses`);
      collectionData(coursesCollection, { idField: 'id' }).subscribe((courses) => {
        this.courses = courses;
      });
    }
  })
  }

  addCourse(){
    if (this.newCourse != null){
      const courseCollection = collection( this.firestore, `users/${this.user.uid}/courses` );
      addDoc(courseCollection, {title: this.newCourse.title})
    }
  }

  goToCourse(courseId: string): void {
    const userId = this.user?.uid;
    if (userId) {
    this.router.navigate(['/course', userId, courseId]);
    }
  }
}



