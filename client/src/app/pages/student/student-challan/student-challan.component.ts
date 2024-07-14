import { Component } from '@angular/core';
import { Service } from 'src/app/services/service';

@Component({
  selector: 'app-student-challan',
  templateUrl: './student-challan.component.html',
  styleUrls: ['./student-challan.component.scss']
})
export class StudentChallanComponent {
  challanData: any;
  year!: number;
  month!: number;

  constructor(private service: Service) {}

  ngOnInit(): void {
    // Set default year and month to current year and month
    const currentDate = new Date();
    this.year = currentDate.getFullYear();
    this.month = currentDate.getMonth() + 1;
  }

  fetchChallan(): void {
    this.service.getChallan(this.year, this.month).subscribe(
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
