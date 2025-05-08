import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Firestore, collection, collectionData, doc, docData } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-course-page',
  imports: [RouterModule, CommonModule],
  templateUrl: './course-page.component.html',
  styleUrl: './course-page.component.css'
})
export class CoursePageComponent {
  private firestore = inject(Firestore);
  private route = inject(ActivatedRoute);

  course: any = null;
  assignments: any[] = [];

  ngOnInit(): void {
    const courseIdFromRoute = this.route.snapshot.paramMap.get('courseId');
    const userId = this.route.snapshot.paramMap.get('userId');
    const courseDoc = doc(this.firestore, `users/${userId}/courses/${courseIdFromRoute}`);
    docData(courseDoc).subscribe((course) => {
    this.course = course;
    console.log('Course:', course);
    const assignmentsPath = course ? `courses/${course['courseId']}/assignments` : '';
    console.log('Assignments Path:', assignmentsPath);

    const assignmentsCollection = collection(this.firestore, assignmentsPath);
    collectionData(assignmentsCollection, { idField: 'id' }).subscribe((assignments) => {
      this.assignments = assignments;
      console.log('Assignments:', assignments);
    });
  });
    }
}
