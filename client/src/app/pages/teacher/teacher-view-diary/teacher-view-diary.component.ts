import { Component } from '@angular/core';
import { Service } from 'src/app/services/service';
import { Courses } from '../../admin/admin-courses/admin-courses.component';
export interface Diary{
  description: string
}
@Component({
  selector: 'app-teacher-view-diary',
  templateUrl: './teacher-view-diary.component.html',
  styleUrls: ['./teacher-view-diary.component.scss']
})
export class TeacherViewDiaryComponent {
  dateFormat = 'yyyy/MM/dd';
  courses: Courses[] = [];
  diary: Diary[] = [ ];


  constructor(private service: Service){ }
  ngOnInit(): void {
    this.fetchCourses();
  }
  fetchCourses(): void {
    this.service.getTeacherCourses()
      .subscribe(
        response => {
          this.courses = response.course;
          console.log(response, this.courses);
        },
        error => {
          console.error('Error fetching classes:', error);
          // Handle error, show error message, etc.
        }
        
      );
  }
}
