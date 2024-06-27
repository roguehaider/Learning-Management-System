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
  classes: Classes[] = [ ];
  constructor(private router: Router) {}

  navigateToAttendence() {
    this.router.navigate(['/admin/take-attendance']);
  }
  navigateToViewAttendence() {
    this.router.navigate(['/admin/view-attendance']);
  }
}
