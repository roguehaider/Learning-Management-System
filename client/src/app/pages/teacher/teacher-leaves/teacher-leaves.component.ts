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
 leaveResponse: {_id?: string; status?: string} = {}


  selectedDate: string = '';
  leaveRequests: any[] = [];

  constructor(private modal: NzModalService, private service: Service, private datePipe: DatePipe) { }

  fetchLeaveRequests() {
    this.selectedDate = this.formatTimestamp(this.selectedDate)
    if (this.selectedDate) {
      this.service.getLeaveRequests(this.selectedDate).subscribe(
        response => {
          this.leaveRequests = response.leaves;
          console.log("lrq", this.leaveRequests);
        },
        error => {
          console.error('Error fetching leave requests:', error);
        }
      );
    }
  }
  
  formatTimestamp(isoDate: any): any {
    return this.datePipe.transform(isoDate, 'yyyy-MM-dd');
  }

  showConfirm(data: any): void {
    this.confirmModal = this.modal.confirm({
      nzTitle: `Do you Want to approve this leave?`,
      nzOkText: 'Approve',
      nzOnOk: () => {
        this.leaveResponse._id= data._id
        this.leaveResponse.status="Accepted"
        this.service.leaveResponse(this.leaveResponse).subscribe(
          response => {
            console.log(response)
          },
          error => {
            console.error('Error posting leave response entry:', error);
          }
        );
      },
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }

  showDeleteConfirm(data: any): void {
    this.modal.confirm({
      nzTitle: `Are you sure remove this leave?`,
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () =>  {
        this.leaveResponse._id= data._id
        this.leaveResponse.status="Rejected"
        this.service.leaveResponse(this.leaveResponse).subscribe(
          response => {
            console.log(response)
          },
          error => {
            console.error('Error posting leave response entry:', error);
          }
        );
      },
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }
}

