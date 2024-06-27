import { Component } from '@angular/core';
import { Students } from '../../admin-student/admin-student.component';
@Component({
  selector: 'app-take-attendance',
  templateUrl: './take-attendance.component.html',
  styleUrls: ['./take-attendance.component.scss']
})
export class TakeAttendanceComponent {
  students: Students[] = [];
}
