import { Component } from '@angular/core';
import { Router } from '@angular/router';

export interface Classes {
  key: string;
  name: string;
}

@Component({
  selector: 'app-admin-attendance',
  templateUrl: './admin-attendance.component.html',
  styleUrls: ['./admin-attendance.component.scss']
})
export class AdminAttendanceComponent {
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

  navigateToAttendence() {
    this.router.navigate(['/admin-take-attendance']);
  }
}
