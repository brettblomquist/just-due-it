import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Firestore, query, where, collection, collectionData, doc, addDoc, getDocs, updateDoc, arrayUnion } from '@angular/fire/firestore';


@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
  })
export class HomeComponent {
  private authService = inject(AuthService);
  private firestore = inject(Firestore);
  private router = inject(Router);
  scheduleId: string | null = null;
  fname: string = '';
  user: any = null;
  courses: any[] = [];
  newCourse = { title: '' }
  isAddingCourse = signal(false);
  courseCode: string = '';

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
      const scheduleCollection = collection(this.firestore, `users/${this.user.uid}/schedule`);
      getDocs(scheduleCollection).then((snapshot) => {
        if (snapshot.empty) {
          addDoc(scheduleCollection, {
            title: '',
            startTime: '',
            endTime: '',
            day: '',
            recurring: '',
          })
        }
      })

      const coursesCollection = collection(this.firestore, `users/${this.user.uid}/courses`);
      collectionData(coursesCollection, { idField: 'id' }).subscribe((courses) => {
        this.courses = courses;
      });
    }
  })
  }

  addCourse(){
    const coursesCollection = collection(this.firestore, 'courses');
    const courseQuery = query(coursesCollection, where('code', '==', this.courseCode))
    getDocs(courseQuery).then((snapshot) => {
      if (!snapshot.empty) {
        const courseDoc = snapshot.docs[0];
        const courseData = courseDoc.data();
        const studentCoursesCollection = collection(this.firestore, `users/${this.user.uid}/courses`);
        addDoc(studentCoursesCollection, {
          title: courseData['title'],
          description: courseData['description'],
          teacherId: courseData['teacherId'],
          courseId: courseDoc.id,
        });
  
        const courseRef = doc(this.firestore, `courses/${courseDoc.id}`);
        updateDoc(courseRef, {
          students: arrayUnion(this.user.uid),
        });
      }
    });
  
  }

  goToCourse(courseId: string): void {
    const userId = this.user?.uid;
    if (userId) {
    this.router.navigate(['/course', userId, courseId]);
    }
  }
}



