import { Component } from '@angular/core';
import { Service } from 'src/app/services/service';
import { Classes } from '../../admin/admin-attendance/admin-attendance.component';
import { AuthService } from 'src/app/services/auth/auth.service';
export interface Attendance {
  date: string
}
@Component({
  selector: 'app-teacher-attendance',
  templateUrl: './teacher-attendance.component.html',
  styleUrls: ['./teacher-attendance.component.scss']
})
export class TeacherAttendanceComponent {

  attendance: Attendance[] = []

  constructor(private service: Service, private authService: AuthService) { }
  ngOnInit(): void {
    this.authService.refreshToken();
    this.fetchAttendance();
  }


  fetchAttendance(): void {
    this.service.getTeacherAttendance().subscribe(
      (response: any) => {
        console.log(response)
        this.attendance = response.attendance; // Assuming your API returns { attendance: [] }
      },
      (error: any) => {
        console.error('Error fetching attendance:', error);
      }
    );
  }
}
