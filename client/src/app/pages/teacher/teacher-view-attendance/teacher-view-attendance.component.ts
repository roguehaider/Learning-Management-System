import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from 'src/app/services/service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-teacher-view-attendance',
  templateUrl: './teacher-view-attendance.component.html',
  styleUrls: ['./teacher-view-attendance.component.scss'],
  providers: [DatePipe]
})
export class TeacherViewAttendanceComponent {
  attendances: any[] = [];
  date: any;

  constructor(private service: Service,private router: Router, private datePipe: DatePipe) {
    console.log("att")
    this.fetchAttendance();
  }


  ngOnInit(): void {
   
  }

  fetchAttendance(): void {
    this.service.getAttendanceByClass().subscribe(
      response => {
        this.attendances = response.attendence;
        console.log(this.attendances);
      },
      error => {
        console.error('Error fetching attendance:', error);
      }
    );
  }
  fetchAttendanceByDate(){
    if(!this.date){
      this.fetchAttendance();
    }
    else{
      this.date = this.formatTimestamp(this.date)
      this.service.getAttendanceByDate(this.date).subscribe(
        response => {
          this.attendances = response.attendence;
          console.log(this.attendances);
        },
        error => {
          console.error('Error fetching attendance:', error);
        }
      );
    }
  }

  navigateToAdd(): void {
    this.router.navigate(["/teacher/post-attendance"]);
  }
  
  formatTimestamp(isoDate: any): any {
    return this.datePipe.transform(isoDate, "YYYY-MM-dd");
  }
}
