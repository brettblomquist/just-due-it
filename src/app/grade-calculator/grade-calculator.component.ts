import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-grade-calculator',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './grade-calculator.component.html',
  styleUrl: './grade-calculator.component.css'
})
export class GradeCalculatorComponent {
  gradeCategories = [
    { name: 'Assignments', grade: 0, weight: 0 },
    { name: 'Projects', grade: 0, weight: 0 },
    { name: 'Exams', grade: 0, weight: 0 },
    { name: 'Quizzes', grade: 0, weight: 0 }
  ];

  finalGrade: number = 0;

  calculateFinalGrade(): void {
    let totalWeight = 0;
    let weightedSum = 0;
    this.gradeCategories.forEach(category => {
      weightedSum += (category.grade * category.weight) / 100;
      totalWeight += category.weight;
    });
    this.finalGrade = weightedSum;
  }
}
