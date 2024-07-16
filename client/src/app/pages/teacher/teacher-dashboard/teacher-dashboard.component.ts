import { Component } from '@angular/core';
import { Announcements } from '../../admin/admin-announcements/admin-announcements.component';
import { Service } from 'src/app/services/service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.scss'],
  providers: [DatePipe]
})
export class TeacherDashboardComponent {
  announcements: Announcements[] = [];
  courses!: number; 
  userName: any;

  constructor(private service: Service, private datePipe: DatePipe) {
    this.fetchCourses();
    this.fetchAnnouncements();
    const userJson = localStorage.getItem('user');

    if (userJson) {
        const user = JSON.parse(userJson);
        
        const firstName = user.Fame;
        const lastName = user.Lname;
        this.userName = `${firstName} ${lastName}`;
    }
  }

  fetchCourses() {
    this.service.getTeacherCourses()
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
