import { Component } from '@angular/core';
import { Announcements } from '../../admin/admin-announcements/admin-announcements.component';
import { Service } from 'src/app/services/service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.scss'],
  providers: [DatePipe]
})
export class TeacherDashboardComponent {
  announcements: Announcements[] = [];
  constructor(private service: Service, private datePipe: DatePipe){
    this.fetchAnnouncements();
  }

  fetchAnnouncements(){
    this.service.getAnnouncements()
    .subscribe(
      response => {
        this.announcements=response.announcements;
        console.log(this.announcements);
      },
      error => {
        console.error('Error fetching students:', error);
      }
    );
  }
  formatTimestamp(isoDate: any): any {
    return this.datePipe.transform(isoDate, 'medium');
  }

}
