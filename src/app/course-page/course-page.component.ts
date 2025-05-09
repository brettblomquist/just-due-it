import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Firestore, collection, collectionData, doc, docData } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-course-page',
  imports: [RouterModule, CommonModule, FormsModule],
  
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

    

    weighted = [0, 0, 0, 0, 0];
    earned = [0, 0, 0, 0, 0];
    total= [0, 0, 0, 0 ,0];

    finalGrade: number | null= null;

    calculateGrade() {
      let weightedSum = 0;
      let totalWeight = 0;
  
      for (let i = 0; i < 5; i++) {
        const weight = this.weighted[i] / 100;
        const score = this.total[i] ? this.earned[i] / this.total[i] : 0;
        weightedSum += score * weight;
        totalWeight += weight;
      }
  
      this.finalGrade = totalWeight > 0 ? +(weightedSum / totalWeight * 100).toFixed(2) : null;
    }
}
