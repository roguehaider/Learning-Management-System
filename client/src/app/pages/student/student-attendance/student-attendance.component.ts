import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Service } from 'src/app/services/service';

@Component({
  selector: 'app-student-attendance',
  templateUrl: './student-attendance.component.html',
  styleUrls: ['./student-attendance.component.scss'],
  providers:[DatePipe]
})
export class StudentAttendanceComponent {

  attendance: any

  presentCount = 0;
  absentCount = 0;
  leaveCount = 0;

  totalCount = 0;
  presentPercent = 0;
  absentPercent = 0;
  leavePercent = 0;

  constructor(private service: Service, private datePipe: DatePipe){}

  ngOnInit(): void {
    this.fetchAttendance();
  }

  fetchAttendance(){
    this.service.getStudentAttendance()
    .subscribe(
      response => {
        this.attendance=response.attendance;
        console.log(this.attendance);
        this.presentCount = this.attendance.filter((a :any) => a.detail.some((d : any) => d.status === 'Present')).length;
        this.absentCount = this.attendance.filter((a : any)=> a.detail.some((d : any) => d.status === 'Absent')).length;
        this.leaveCount = this.attendance.filter((a : any)=> a.detail.some((d : any) => d.status === 'Leave')).length;

        this.totalCount = this.presentCount + this.absentCount + this.leaveCount;

        if (this.totalCount > 0) {
          this.presentPercent = parseFloat(((this.presentCount / this.totalCount) * 100).toFixed(2));
          this.absentPercent = parseFloat(((this.absentCount / this.totalCount) * 100).toFixed(2));
          this.leavePercent = parseFloat(((this.leaveCount / this.totalCount) * 100).toFixed(2));
        }
      },
      error => {
        console.error('Error fetching students:', error);
      }
    );
  }

  formatTimestamp(isoDate: any): any {
    return this.datePipe.transform(isoDate, "YYYY-MM-dd");
  }

}
