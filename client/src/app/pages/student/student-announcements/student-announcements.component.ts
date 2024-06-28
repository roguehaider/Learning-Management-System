import { Component } from '@angular/core';
import { Announcements } from '../../admin/admin-announcements/admin-announcements.component';
import { Service } from 'src/app/services/service';
import { AuthService } from 'src/app/services/auth/auth.service';
@Component({
  selector: 'app-student-announcements',
  templateUrl: './student-announcements.component.html',
  styleUrls: ['./student-announcements.component.scss']
})
export class StudentAnnouncementsComponent {
  announcements: Announcements[] = [];
  loading = false;

  constructor( private service: Service, private authService: AuthService) { }
  ngOnInit(): void {
    this.authService.getRefreshToken();
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
