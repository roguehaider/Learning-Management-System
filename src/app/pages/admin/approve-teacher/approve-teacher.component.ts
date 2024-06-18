import { Component } from '@angular/core';
import { Teachers } from '../admin-teacher/admin-teacher.component';
@Component({
  selector: 'app-approve-teacher',
  templateUrl: './approve-teacher.component.html',
  styleUrls: ['./approve-teacher.component.scss']
})
export class ApproveTeacherComponent {
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
}
