import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Service } from 'src/app/services/service';
import { Courses } from '../../admin/admin-courses/admin-courses.component';

@Component({
  selector: 'app-student-courses',
  templateUrl: './student-courses.component.html',
  styleUrls: ['./student-courses.component.scss']
})
export class StudentCoursesComponent {
  isVisible = false;

  courses: Courses[] = [ ];
  constructor(private router: Router,private modal: NzModalService, private service: Service,  private authService: AuthService) {}
  ngOnInit(): void {
    this.authService.refreshToken();
    this.fetchCourses();
  }
  fetchCourses(): void {
    this.service.getStudentCourses()
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
