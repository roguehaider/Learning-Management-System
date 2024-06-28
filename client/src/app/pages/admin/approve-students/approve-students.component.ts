import { Component } from '@angular/core';
import { Students } from '../admin-student/admin-student.component';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
@Component({
  selector: 'app-approve-students',
  templateUrl: './approve-students.component.html',
  styleUrls: ['./approve-students.component.scss']
})
export class ApproveStudentsComponent {
  isVisible = false;
  confirmModal?: NzModalRef;

  students: Students[] = [ ];
  constructor(private modal: NzModalService) {}

  showConfirm(Fname: any): void {
    this.confirmModal = this.modal.confirm({
      nzTitle: `Do you Want to approve ${Fname}?`,
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
