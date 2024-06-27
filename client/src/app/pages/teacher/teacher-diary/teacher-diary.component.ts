import { Component } from '@angular/core';
import { Classes } from '../../admin/admin-attendance/admin-attendance.component';
import { Router } from '@angular/router';
import { Service } from 'src/app/services/service';
import { Courses } from '../../admin/admin-courses/admin-courses.component';
@Component({
  selector: 'app-teacher-diary',
  templateUrl: './teacher-diary.component.html',
  styleUrls: ['./teacher-diary.component.scss']
})
export class TeacherDiaryComponent {
  isVisible = false;

  courses: Courses[] = [ ];

  constructor(private router: Router, private service: Service) {}
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
