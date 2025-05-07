import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { deleteDoc, doc, docData, Firestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-assignment-page',
  imports: [CommonModule],
  templateUrl: './assignment-page.component.html',
  styleUrl: './assignment-page.component.css'
})
export class AssignmentPageComponent {
  assignmentId: string | null = null;
  courseId: string | null = null;
  assignment: any = null;

  constructor(private route: ActivatedRoute, private firestore: Firestore, private router: Router) {}

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('courseId');
    this.assignmentId = this.route.snapshot.paramMap.get('assignmentId');
      const assignmentDoc = doc(this.firestore, `courses/${this.courseId}/assignments/${this.assignmentId}`);
      docData(assignmentDoc).subscribe((data) => {
        this.assignment = data;
      });
  }

  deleteAssignment(): void {
    if (this.courseId && this.assignmentId) {
      const assignmentDocRef = doc(this.firestore, `courses/${this.courseId}/assignments/${this.assignmentId}`);
      deleteDoc(assignmentDocRef).then(() => {
        this.router.navigate([`/teacher/course/${this.courseId}`]);
      })
      }
    }

    cancelDelete(): void {
      this.router.navigate([`/teacher/course/${this.courseId}`]);
    }
}
