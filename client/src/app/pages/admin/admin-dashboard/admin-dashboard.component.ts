import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Service } from 'src/app/services/service';
import { Students } from '../admin-student/admin-student.component';
import { Teachers } from '../admin-teacher/admin-teacher.component';
import { Classes } from '../admin-classes/admin-classes.component';
import { Courses } from '../admin-courses/admin-courses.component';
import { Announcements } from '../admin-announcements/admin-announcements.component';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
  providers: [DatePipe]

})
export class AdminDashboardComponent {
  students: Students[] = [];
  teachers: Teachers[] = [];
  classes: Classes[] = [];
  courses: Courses[] = [];
  announcements: Announcements[] = [];


  constructor(private service: Service, private authService: AuthService, private datePipe: DatePipe) {
    this.authService.refreshToken();
    this.fetchStudents();
    this.fetchTeachers();
    this.fetchClasses();
    this.fetchCourses();
    this.fetchAnnouncements();
  }

  fetchStudents(): void {
    this.service.getStudents()
      .subscribe(
        response => {
          const len = response.students;
          this.students = len.length;
        },
        error => {
          console.error('Error fetching students:', error);
        }
      );
  }

  fetchTeachers(): void {
    this.service.getTeacher()
      .subscribe(
        response => {
          const len = response.TeachersDto;
          this.teachers = len.length;
        },
        error => {
          console.error('Error fetching students:', error);
        }
      );
  }
  fetchClasses(): void {
    this.service.getClasses()
      .subscribe(
        response => {
          const len = response.classes;
          this.classes = len.length;
        },
        error => {
          console.error('Error fetching students:', error);
        }
      );
  }
  fetchCourses(): void {
    this.service.getCourses()
      .subscribe(
        response => {
          const len = response.courses;
          this.courses = len.length;
        },
        error => {
          console.error('Error fetching students:', error);
        }
      );
  }
  fetchAnnouncements(){
    this.service.getAnnouncements()
    .subscribe(
      response => {
        this.announcements=response.announcements;
        console.log(this.announcements);
      },
      error => {
        console.error('Error fetching students:', error);
      }
    );
  }

  formatTimestamp(isoDate: any): any {
    return this.datePipe.transform(isoDate, 'medium');
  }
}
