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
  // attendance: Attendance[] = []
  //all courses for attendance
  courses: any;
  students: any
  // selectCourseId: any

  attendanceOptions = [
    { label: 'P', value: 'Present', checked: false },
    { label: 'A', value: 'Absent', checked: false },
    { label: 'L', value: 'Leave', checked: false }
  ];

  studentAttendance: { date: string, attendanceList: any } = {
    date: '',
    attendanceList: [] as any[]
  };

  constructor(private service: Service, private authService: AuthService, private datePipe: DatePipe) { }
  ngOnInit(): void {
    this.authService.refreshToken();
    this.fetchCourses();
    this.fetchStudentsForCourse();
    // this.fetchAttendance();
  }

  fetchStudentsForCourse() {
    this.service.getStudentsOfClass()
      .subscribe(
        response => {
          this.students = response.students
          console.log(response);
        },
        error => {
          console.error('Error fetching classes:', error);
          // Handle error, show error message, etc.
        }

      );
  }


  fetchCourses() {
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

  onCheckBoxChange(data: any, selectedAttendance: any) {
    this.attendanceOptions.forEach(attendance => {
      attendance.checked = (attendance === selectedAttendance);
    });
  
    let found = false;
  
    this.studentAttendance.attendanceList.forEach((item: any) => {
      if (item.student === data._id) {
        item.status = selectedAttendance.value;
        found = true;
      }
    });
  
    if (!found) {
      this.studentAttendance.attendanceList.push({ student: data._id, status: selectedAttendance.value });
    }
  
    console.log(this.studentAttendance);
  }
  
  formatTimestamp(isoDate: any): any {
    return this.datePipe.transform(isoDate, "YYYY-MM-dd");
  }

  submitAttendance() {
    this.studentAttendance.date = this.formatTimestamp(this.studentAttendance.date)
    console.log(this.studentAttendance)
    this.service.createTeacherAttendance(this.studentAttendance)
      .subscribe(response => {
        console.log('Attendance posted:', response);
      }, error => {
        console.error('Error posting attendance:', error);
      });
  }

}

