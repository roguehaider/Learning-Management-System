import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Service } from 'src/app/services/service';
@Component({
  selector: 'app-student-diary',
  templateUrl: './student-diary.component.html',
  styleUrls: ['./student-diary.component.scss'],
  providers: [DatePipe]
})
export class StudentDiaryComponent {
  viewDiaryDate: any;
  diary: any
 
  constructor(private datePipe: DatePipe, private service: Service){}

  fetchDiary(){
    this.viewDiaryDate = this.datePipe.transform(this.viewDiaryDate, 'yyyy-MM-dd');
    this.diary= ''
    console.log(this.viewDiaryDate)
    this.service.getStudentDiary(this.viewDiaryDate).subscribe(
      response => {
        this.diary = response.diary
        console.log(response)
      },
      error => {
        console.error('Error posting leave request:', error);
      }
    );
  }

  formatTimestamp(date: any): any {
    return this.datePipe.transform(date, "dd-MM-YYY");
  }
}
