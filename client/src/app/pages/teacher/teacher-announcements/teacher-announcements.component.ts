import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Service } from 'src/app/services/service';
import { Announcements } from '../../admin/admin-announcements/admin-announcements.component';

@Component({
  selector: 'app-teacher-announcements',
  templateUrl: './teacher-announcements.component.html',
  styleUrls: ['./teacher-announcements.component.scss']
})
export class TeacherAnnouncementsComponent {
  announcements: Announcements[] = [];
  newAnnouncement: Partial<Announcements> = {
    title: '',
    description: '',
  }
  loading = false;

  constructor(private router: Router,private modal: NzModalService, private service: Service) {}
  ngOnInit(): void {
    this.fetchAnnouncements();
  }
  fetchAnnouncements(): void {
    this.service.getAnnouncements()
      .subscribe(
        response => {
          console.log(response)
         this.announcements = response.announcements;
         console.log(this.announcements, response)
        },
        error => {
          console.error('Error fetching classes:', error);
        }
        
      );
  }

  trackByFn(index: number, item: any): any {
    return item.id; // or any unique identifier for the item
  }
}
