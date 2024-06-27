import { Component } from '@angular/core';
import { Service } from 'src/app/services/service';
import { Classes } from '../../admin/admin-attendance/admin-attendance.component';
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

  constructor(private service: Service) { }

}
