import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, doc, docData } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLinkWithHref } from '@angular/router';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-teacher-course-page',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './teacher-course-page.component.html',
  styleUrl: './teacher-course-page.component.css'
})
export class TeacherCoursePageComponent {
  private firestore = inject(Firestore);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  createAssignment = signal(false)
  
  course: any = null;
  assignments: any[] = [];
  newAssignment = { title: '', description: '', dueDate: ''}


  ngOnInit(): void {
    const courseId = this.route.snapshot.paramMap.get('courseId');
    const courseDoc = doc(this.firestore, `courses/${courseId}`)
    docData(courseDoc).subscribe((course) => {
      this.course = { id: courseId, ...course };
    })

    const assignmentsCollection = collection(this.firestore, `courses/${courseId}/assignments`);
    collectionData(assignmentsCollection, { idField: 'id'}).subscribe((assignments) => {
      this.assignments = assignments;
    });

  }

  createNewAssignment(): void {
    const courseId = this.route.snapshot.paramMap.get('courseId');
    const assignmentsCollection = collection(this.firestore, `courses/${courseId}/assignments`);
    addDoc(assignmentsCollection, {
      title: this.newAssignment.title,
      description: this.newAssignment.description,
      dueDate: this.newAssignment.dueDate,
    })
  }

  toggleCreateAssignment(): void {
    this.createAssignment.set(!this.createAssignment())
  }

  backToCourses(): void {
    this.router.navigate(['/teacher-dashboard'])
  }
}
