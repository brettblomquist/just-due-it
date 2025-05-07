import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Firestore, collection, collectionData, doc, docData } from '@angular/fire/firestore';

@Component({
  selector: 'app-course-page',
  imports: [],
  templateUrl: './course-page.component.html',
  styleUrl: './course-page.component.css'
})
export class CoursePageComponent {
  private firestore = inject(Firestore);
  private route = inject(ActivatedRoute);

  course: any = null;
  assignments: any[] = [];

  ngOnInit(): void {
    const courseId = this.route.snapshot.paramMap.get('courseId');
    const userId = this.route.snapshot.paramMap.get('userId');
      const courseDoc = doc(this.firestore, `users/${userId}/courses/${courseId}`);
      docData(courseDoc).subscribe((course) => {
        this.course = course;
      });
      
      const assignmentsCollection = collection(this.firestore, `courses/${courseId}/assignments`);
      collectionData(assignmentsCollection, {idField: 'id'}).subscribe((assignments) => {
        this.assignments = assignments;
      })
    }
}
