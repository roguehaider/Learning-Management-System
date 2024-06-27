import { Component } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
export interface Leaves {
  key: string;
  name: string;
  class: string;
  reason: string;
  date: string;
}
@Component({
  selector: 'app-admin-leaves',
  templateUrl: './admin-leaves.component.html',
  styleUrls: ['./admin-leaves.component.scss']
})
export class AdminLeavesComponent {

  isVisible = false;
  confirmModal?: NzModalRef;
  
  leaves: Leaves[] = [
    {
      key: '1',
      name: 'Student A',
      class: 'Class 1',
      reason: 'Sick Leave',
      date: '21 June, 2024',
    },
    {
      key: '3',
      name: 'Student B',
      class: 'Class 1',
      reason: 'Vacation',
      date: '21 June, 2024',
    },
    {
      key: '3',
      name: 'Student C',
      class: 'Class 1',
      reason: 'Sick Leave',
      date: '22 June, 2024',
    },
  ];

  constructor(private modal: NzModalService) {}

  showConfirm(): void {
    this.confirmModal = this.modal.confirm({
      nzTitle: `Do you Want to approve this leave?`,
      nzOkText: 'Approve',
      // nzContent: 'When clicked the OK button, this dialog will be closed after 1 second',
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch(() => console.log('Oops errors!'))
    });
  }

  showDeleteConfirm(): void {
    this.modal.confirm({
      nzTitle: `Are you sure remove this leave?`,
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
