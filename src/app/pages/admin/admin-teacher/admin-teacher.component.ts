import { Component } from '@angular/core';
import { Router } from '@angular/router';
export interface Teachers {
  key: string;
  name: string;
  mobile: string;
  salary: string;
  joiningDate: string;
}
@Component({
  selector: 'app-admin-teacher',
  templateUrl: './admin-teacher.component.html',
  styleUrls: ['./admin-teacher.component.scss']
})
export class AdminTeacherComponent {
  teachers: Teachers[] = [
    {
      key: '1',
      name: 'Teacher IT',
      mobile: '12345678',
      salary: '130,000',
      joiningDate: 'Jan 1st, 2024',
    },
    {
      key: '2',
      name: 'Teacher IT',
      mobile: '12345678',
      salary: '80,000',
      joiningDate: 'Jan 1st, 2024',
    },
    {
      key: '3',
      name: 'Teacher IT',
      mobile: '12345678',
      salary: '100,000',
      joiningDate: 'Jan 1st, 2024',
    },
    {
      key: '3',
      name: 'Teacher IT',
      mobile: '12345678',
      salary: '100,000',
      joiningDate: 'Jan 1st, 2024',
    },
    {
      key: '3',
      name: 'Teacher IT',
      mobile: '12345678',
      salary: '100,000',
      joiningDate: 'Jan 1st, 2024',
    },
    {
      key: '3',
      name: 'Teacher IT',
      mobile: '12345678',
      salary: '100,000',
      joiningDate: 'Jan 1st, 2024',
    },
    {
      key: '3',
      name: 'Teacher IT',
      mobile: '12345678',
      salary: '100,000',
      joiningDate: 'Jan 1st, 2024',
    },
  ];
  constructor(private router: Router) {}
  navigateToApprove() {
    this.router.navigate(['/admin-approve-teacher']); 
  }
  navigateToAdd() {
    this.router.navigate(['/admin-add-teacher']); 
  }
}
