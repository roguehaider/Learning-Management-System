import { Component } from '@angular/core';
import { Service } from 'src/app/services/service';

@Component({
  selector: 'app-student-result',
  templateUrl: './student-result.component.html',
  styleUrls: ['./student-result.component.scss']
})
export class StudentResultComponent {
  resultData:any;

  constructor(private service: Service){}

  ngOnInit(): void {
    this.fetchResult();
  }

  fetchResult(): void {
    this.service.getResult().subscribe(
      (response) => {
        // Filter out empty items from response.ResultDTO and extract obtained_marks
        this.resultData = response.ResultDTO.filter((item: any) => {
          // Check if item is not empty
          return item && Object.keys(item).length !== 0;
        }).map((item: any) => {
          // Extract obtained_marks
          const obtainedMarks = item.Marks.map((mark: any) => mark.obtained_marks);
          return {
            ...item,
            obtained_marks: obtainedMarks
          };
        });

        console.log(this.resultData);
      },
      (error) => {
        console.error('Error fetching challan:', error);
      }
    );
}


}
