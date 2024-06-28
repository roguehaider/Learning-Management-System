import { Component } from '@angular/core';
import { Teachers } from '../admin-teacher/admin-teacher.component';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
@Component({
  selector: 'app-approve-teacher',
  templateUrl: './approve-teacher.component.html',
  styleUrls: ['./approve-teacher.component.scss']
})
export class ApproveTeacherComponent {
  confirmModal?: NzModalRef;
  // teachers: Teachers[] = [
  //   {
  //     key: '1',
  //     name: 'Teacher IT',
  //     mobile: '12345678',
  //     salary: '130,000',
  //     joiningDate: 'Jan 1st, 2024',
  //   },
  //   {
  //     key: '2',
  //     name: 'Teacher IT',
  //     mobile: '12345678',
  //     salary: '80,000',
  //     joiningDate: 'Jan 1st, 2024',
  //   },
  //   {
  //     key: '3',
  //     name: 'Teacher IT',
  //     mobile: '12345678',
  //     salary: '100,000',
  //     joiningDate: 'Jan 1st, 2024',
  //   },
  //   {
  //     key: '3',
  //     name: 'Teacher IT',
  //     mobile: '12345678',
  //     salary: '100,000',
  //     joiningDate: 'Jan 1st, 2024',
  //   },
  //   {
  //     key: '3',
  //     name: 'Teacher IT',
  //     mobile: '12345678',
  //     salary: '100,000',
  //     joiningDate: 'Jan 1st, 2024',
  //   },
  //   {
  //     key: '3',
  //     name: 'Teacher IT',
  //     mobile: '12345678',
  //     salary: '100,000',
  //     joiningDate: 'Jan 1st, 2024',
  //   },
  //   {
  //     key: '3',
  //     name: 'Teacher IT',
  //     mobile: '12345678',
  //     salary: '100,000',
  //     joiningDate: 'Jan 1st, 2024',
  //   },
  // ];

  constructor(private modal: NzModalService) {}

  showConfirm(name: any): void {
    this.confirmModal = this.modal.confirm({
      nzTitle: `Do you Want to approve ${name}?`,
      nzOkText: 'Approve',
      // nzContent: 'When clicked the OK button, this dialog will be closed after 1 second',
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch(() => console.log('Oops errors!'))
    });
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
}
