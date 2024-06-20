import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
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
  isVisible = false;

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
  constructor(private router: Router,private modal: NzModalService) {}
  navigateToApprove() {
    this.router.navigate(['/admin/approve-student']); 
  } 
  navigateToAdd() {
    this.router.navigate(['/admin/add-student']); 
  } 

  showDeleteConfirm(): void {
    this.modal.confirm({
      nzTitle: 'Are you sure remove this student?',
      // nzContent: '<b style="color: red;">Some descriptions</b>',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => console.log('OK'),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }
  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
}
