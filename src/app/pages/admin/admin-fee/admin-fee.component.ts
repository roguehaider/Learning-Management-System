import { Component } from '@angular/core';


interface Classes {
  key: string;
  name: string;
}

@Component({
  selector: 'app-admin-fee',
  templateUrl: './admin-fee.component.html',
  styleUrls: ['./admin-fee.component.scss']
})
export class AdminFeeComponent {
  classes: Classes[] = [
    {
      key: '1',
      name: 'Class 1',
    },
    {
      key: '2',
      name: 'Class 2',
    },
    {
      key: '3',
      name: 'Class 3',
    }
  ];
}
