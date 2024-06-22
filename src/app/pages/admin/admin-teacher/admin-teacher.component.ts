import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
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
  isVisible = false;

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
  constructor(private router: Router,private modal: NzModalService) {}

  navigateToApprove() {
    this.router.navigate(['/admin/approve-teacher']); 
  }
  navigateToAdd() {
    this.router.navigate(['/admin/add-teacher']); 
  }

  showDeleteConfirm(name: any): void {
    this.modal.confirm({
      nzTitle: `Are you sure remove ${name}?`,
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
