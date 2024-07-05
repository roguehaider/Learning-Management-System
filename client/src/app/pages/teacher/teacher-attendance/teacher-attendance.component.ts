import { Component } from '@angular/core';
import { Service } from 'src/app/services/service';
import { Classes } from '../../admin/admin-attendance/admin-attendance.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DatePipe } from '@angular/common';
export interface Attendance {
  date: string
}
@Component({
  selector: 'app-teacher-attendance',
  templateUrl: './teacher-attendance.component.html',
  styleUrls: ['./teacher-attendance.component.scss'],
  providers: [DatePipe]
})
export class TeacherAttendanceComponent {

  dateFormat = 'yyyy/MM/dd';
  attendance: Attendance[] = []
  //all courses for attendance
  courses: any;
  selectCourseId: any

  constructor(private service: Service, private authService: AuthService) { }
  ngOnInit(): void {
    this.authService.refreshToken();
    this.fetchCourses();
    // this.fetchStudentsForCourse();
    // this.fetchAttendance();
  }

  fetchStudentsForCourse(){
    this.service.getCoursesForAttendance()
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


  fetchCourses(){
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
  // fetchAttendance(): void {
  //   this.service.creareTeacherAttendance().subscribe(
  //     (response: any) => {
  //       console.log(response)
  //       this.attendance = response.attendance; // Assuming your API returns { attendance: [] }
  //     },
  //     (error: any) => {
  //       console.error('Error fetching attendance:', error);
  //     }
  //   );
  // }
}
