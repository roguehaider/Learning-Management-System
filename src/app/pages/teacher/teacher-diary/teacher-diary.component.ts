import { Component } from '@angular/core';
import { Classes } from '../../admin/admin-attendance/admin-attendance.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-teacher-diary',
  templateUrl: './teacher-diary.component.html',
  styleUrls: ['./teacher-diary.component.scss']
})
export class TeacherDiaryComponent {
  classes: Classes[] = [
    {
      key: '1',
      name: 'Class 1',
    },
    {
      key: '2',
      name: 'Class 2',
    },
    {
      key: '3',
      name: 'Class 3',
    }
  ];

  constructor(private router: Router) {}

  navigateToViewAttendence() {
    this.router.navigate(['/teacher/view-diary']);
  }
}
