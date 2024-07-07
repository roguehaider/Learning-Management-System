import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Service } from 'src/app/services/service';


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

  constructor(private datePipe: DatePipe, private service: Service){}
  fetchLeaves(){
    // this.viewleaveDate = this.formatTimestamp(this.viewleaveDate)
    this.viewleaveDate = this.datePipe.transform(this.viewleaveDate, 'yyyy-MM-dd');
    this.service.getStudentLeaves(this.viewleaveDate).subscribe(
      response => {
        console.log(response)
      },
      error => {
        console.error('Error posting leave request:', error);
      }
    );
  }
  formatTimestamp(isoDate: any): any {
    return this.datePipe.transform(isoDate, 'yyyy-MM-ddTHH:mm:ss.sssZ');
    }
  showModal(): void {
    this.isVisible = true;
  }

  handleCancel(): void {
    this.isVisible = false;
  }
  handleOk(): void {
    this.leaveReq.date= this.formatTimestamp(this.leaveReq.date)
    console.log('Leave request:', this.leaveReq);
    if (this.leaveReq) {
      this.service.postStudentLeave(this.leaveReq).subscribe(
        response => {
          console.log(response)
        },
        error => {
          console.error('Error posting leave request:', error);
        }
      );
    }
    this.isVisible = false;
  }

}
