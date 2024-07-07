import { Component } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Service } from 'src/app/services/service';
import { DatePipe } from '@angular/common';
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
  styleUrls: ['./teacher-leaves.component.scss'],
  providers: [DatePipe]
})
export class TeacherLeavesComponent {

  isVisible = false;
  confirmModal?: NzModalRef;
  dateFormat = 'yyyy/MM/dd';

  

  selectedDate: string = '';
  leaveRequests: any[] = [];

  constructor(private modal: NzModalService, private service: Service, private datePipe: DatePipe) {}

  fetchLeaveRequests() {
    this.selectedDate = this.formatTimestamp(this.selectedDate)
    if (this.selectedDate) {
      this.service.getLeaveRequests(this.selectedDate).subscribe(
        response => {
          this.leaveRequests = response.leaves;
          console.log("lrq",this.leaveRequests);
        },
        error => {
          console.error('Error fetching leave requests:', error);
        }
      );
    }
  }
  formatTimestamp(isoDate: any): any {
    return this.datePipe.transform(isoDate, 'yyyy-MM-ddTHH:mm:ss.sssZ');
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

