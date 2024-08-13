import { Component } from '@angular/core';
import { Service } from 'src/app/services/service';
import { DatePipe } from '@angular/common';
import { Announcements } from '../../admin/admin-announcements/admin-announcements.component';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.scss'],
  providers: [DatePipe]
})
export class StudentDashboardComponent {
  announcements: Announcements[] = [];
  courses!: number; 
  userName: any;
  rollNo: any

  constructor(private service: Service, private datePipe: DatePipe, private authService: AuthService) {
    this.authService.refreshToken();
    this.fetchCourses();
    this.fetchAnnouncements();
    const userJson = localStorage.getItem('user');

    if (userJson) {
        const user = JSON.parse(userJson);
        this.rollNo = user.roll_No
        const firstName = user.Fame;
        const lastName = user.Lname;
        this.userName = `${firstName} ${lastName}`;
    }
  }

  fetchCourses() {
    this.service.getStudentCourses()
      .subscribe(
        response => {
          console.log(response);
          const courses = response.course
          this.courses = courses.length
        },
        error => {
          console.error('Error fetching students:', error);
        }
      );
  }

  fetchAnnouncements() {
    this.service.getAnnouncements()
      .subscribe(
        response => {
          this.announcements = response.announcements;
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
