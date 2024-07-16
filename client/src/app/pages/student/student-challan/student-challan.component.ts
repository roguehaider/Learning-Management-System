import { Component } from '@angular/core';
import { Service } from 'src/app/services/service';
interface Date{
  year: number,
  month: number
}
@Component({
  selector: 'app-student-challan',
  templateUrl: './student-challan.component.html',
  styleUrls: ['./student-challan.component.scss']
})
export class StudentChallanComponent {
  challanData: any;
  date: Partial<Date>= {
    year: 0,
    month: 0
  
  }
  year!: number;
  month!: number;
  constructor(private service: Service) {}

  ngOnInit(): void {
    // Set default year and month to current year and month
    const currentDate = new Date();
    this.date.year = currentDate.getFullYear();
    this.date.month = currentDate.getMonth() + 1;
  }

  fetchChallan(): void {
    
    const data = {
      year: this.date.year,
      month: this.date.month
    };
    console.log(data)
    this.service.getChallan(data).subscribe(
      (response) => {
        this.challanData = response.challanData;
        console.log(this.challanData);
      },
      (error) => {
        console.error('Error fetching challan:', error);
      }
    );
  }
}
