import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherCoursePageComponent } from './teacher-course-page.component';

describe('TeacherCoursePageComponent', () => {
  let component: TeacherCoursePageComponent;
  let fixture: ComponentFixture<TeacherCoursePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherCoursePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherCoursePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
