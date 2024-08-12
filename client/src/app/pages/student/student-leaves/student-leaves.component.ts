import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Service } from 'src/app/services/service';
import { ToastService } from 'src/app/utils/toast.service';


@Component({
  selector: 'app-student-leaves',
  templateUrl: './student-leaves.component.html',
  styleUrls: ['./student-leaves.component.scss'],
  providers: [DatePipe]
})
export class StudentLeavesComponent {
  isVisible = false;
  leaveReq: { date?: Date; description?: string } = {};
  viewleaveDate: any;
  viewLeaves: any;
  leavestatus: any

  constructor(private datePipe: DatePipe, private service: Service, private toastService: ToastService){}

  fetchLeaves(){
    this.viewleaveDate = this.datePipe.transform(this.viewleaveDate, 'yyyy-MM-dd');
    console.log(this.viewleaveDate)
    this.service.getStudentLeaves(this.viewleaveDate).subscribe(
      response => {
        console.log(response)
        this.leavestatus = response.leavestatus
      },
      error => {
        console.error('Error posting leave request:', error);
      }
    );
  }

  formatTimestamp(isoDate: any): any {
    return this.datePipe.transform(isoDate, 'yyyy-MM-dd');
    }

  showModal(): void {
    this.isVisible = true;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  handleOk(): void {
    this.leaveReq.date= this.formatTimestamp(this.leaveReq.date)
    // console.log('Leave request:', this.leaveReq);
    if (this.leaveReq) {
      this.service.postStudentLeave(this.leaveReq).subscribe(
        response => {
          console.log(response) 
          this.toastService.showToast("success", response.message);
        },
        error => {
          console.error('Error posting leave request:', error);
        }
      );
    }
    this.isVisible = false;
  }

  getLeaveStatusClass(status: string): string {
    switch (status) {
      case 'Accepted':
        return 'accepted';
      case 'Rejected':
        return 'rejected';
      default:
        return 'default';
    }
  }

}
