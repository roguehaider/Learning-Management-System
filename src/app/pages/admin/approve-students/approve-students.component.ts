import { Component } from '@angular/core';
import { Students } from '../admin-student/admin-student.component';
@Component({
  selector: 'app-approve-students',
  templateUrl: './approve-students.component.html',
  styleUrls: ['./approve-students.component.scss']
})
export class ApproveStudentsComponent {
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
  ];
}
