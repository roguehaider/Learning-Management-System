import { Component } from '@angular/core';
import { Service } from 'src/app/services/service';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AuthService } from 'src/app/services/auth/auth.service';
export interface Suggestions {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
  poster: {
    Fname: string;
    Lname: string;
    role: string;
  };
}
@Component({
  selector: 'app-admin-suggestions',
  templateUrl: './admin-suggestions.component.html',
  styleUrls: ['./admin-suggestions.component.scss']
})
export class AdminSuggestionsComponent {

  loading = true;
  
  isVisible = false;
  suggestions: Suggestions[] = [];

  constructor(private service: Service, private router: Router,private modal: NzModalService, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.refreshToken();
    this.fetchSuggestions();
  }

  fetchSuggestions(): void {
    this.service.getAllSuggestions().subscribe(
      (response: any) => {
        this.suggestions = response.suggestions;
        console.log(response)
        this.loading = false;
      },
      (error: any) => {
        console.error('Error fetching suggestions:', error);
        this.loading = false;
      }
    );
  }
  deleteSuggestion(id: string): void {
    this.service.deleteSuggestion(id).subscribe(
      (response) => {
        console.log('Suggestion deleted successfully:', response);
        this.fetchSuggestions(); // Refresh the list
      },
      (error) => {
        console.error('Error deleting suggestion:', error);
      }
    );
  }


  // createAnnouncement(): void {
  //   this.service.createAnnouncement(this.newAnnouncement)
  //     .subscribe(
  //       response => {
  //         console.log('Announcement created successfully:', response);
  //         this.isVisible = false;
  //         this.fetchAnnouncements();
  //         // this.resetForm();
  //       },
  //       error => {
  //         console.error('Error creating announcement:', error);
  //       }
  //     );
  // }

  showModal(): void {
    this.isVisible = true;
  }

  handleCancel(): void {
    this.isVisible = false;
    // this.resetForm();
  }
  handleOk(): void {
    console.log('Button ok clicked!');
    // this.createAnnouncement();
    this.isVisible = false;
  }

  trackByFn(index: number, item: any): any {
    return item.id; // or any unique identifier for the item
  }
  showDeleteConfirm(_id:any): void {
    this.modal.confirm({
      nzTitle: 'Are you sure delete this suggestion?',
      nzOkText: 'Yes',
      nzOkType: 'primary',

      nzOkDanger: true,
      nzOnOk: () => {
        this.deleteSuggestion(_id);
        this.fetchSuggestions();
      },
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }
}
