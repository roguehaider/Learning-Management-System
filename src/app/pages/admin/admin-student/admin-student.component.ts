import { Component } from '@angular/core';
import { Router } from '@angular/router';
export interface Students {
  key: string;
  name: string;
  class: string;
  mobile: string;
  fee: string;
}
@Component({
  selector: 'app-admin-student',
  templateUrl: './admin-student.component.html',
  styleUrls: ['./admin-student.component.scss']
})
export class AdminStudentComponent {
  students: Students[] = [
    {
      key: '1',
      name: 'Teacher IT',
      class: 'Class 1',
      mobile: '12345678',
      fee: '130,000',
    },
    {
      key: '3',
      name: 'Teacher IT',
      class: 'Class 1',
      mobile: '12345678',
      fee: '100,000',
    },
    {
      key: '3',
      name: 'Teacher IT',
      class: 'Class 1',
      mobile: '12345678',
      fee: '100,000',
    },
    {
      key: '3',
      name: 'Teacher IT',
      class: 'Class 1',
      mobile: '12345678',
      fee: '100,000',
    },
  ];
  constructor(private router: Router) {}
  navigateToApprove() {
    this.router.navigate(['/admin-approve-student']); 
  } 
  navigateToAdd() {
    this.router.navigate(['/admin-add-student']); 
  } 
}
