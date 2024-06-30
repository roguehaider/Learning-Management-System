import { Component } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Service } from 'src/app/services/service';
export interface Leaves {
  key: string;
  name: string;
  class: string;
  reason: string;
  date: string;
}
@Component({
  selector: 'app-teacher-leaves',
  templateUrl: './teacher-leaves.component.html',
  styleUrls: ['./teacher-leaves.component.scss']
})
export class TeacherLeavesComponent {

  isVisible = false;
  confirmModal?: NzModalRef;
  dateFormat = 'yyyy/MM/dd';

  leaves: Leaves[] = [];
  leaveDate: Partial<Leaves> = {
  date:''
  }

  constructor(private modal: NzModalService, private service: Service) {}


  fetchLeaveRequests(): void {
    console.log(this.leaveDate)
    this.service.getLeaveRequests(this.leaveDate.date).subscribe(
      response => {
        this.leaves = response.leaves;
        console.log(response)
      },
      error => {
        console.error('Error fetching leave requests:', error);
      }
    );
  }

  showConfirm(): void {
    this.confirmModal = this.modal.confirm({
      nzTitle: `Do you Want to approve this leave?`,
      nzOkText: 'Approve',
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch(() => console.log('Oops errors!'))
    });
  }

  showDeleteConfirm(): void {
    this.modal.confirm({
      nzTitle: `Are you sure remove this leave?`,
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => console.log('OK'),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }
}

