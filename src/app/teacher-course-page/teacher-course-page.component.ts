import { Component, inject } from '@angular/core';
import { Firestore, doc, docData } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-teacher-course-page',
  imports: [],
  templateUrl: './teacher-course-page.component.html',
  styleUrl: './teacher-course-page.component.css'
})
export class TeacherCoursePageComponent {
  private firestore = inject(Firestore);
  private route = inject(ActivatedRoute);
  
  course: any = null;

  ngOnInit(): void {
    const courseId = this.route.snapshot.paramMap.get('courseId');
    const courseDoc = doc(this.firestore, `courses/${courseId}`)
    docData(courseDoc).subscribe((course) => {
      this.course = course;
    })
  }
}
