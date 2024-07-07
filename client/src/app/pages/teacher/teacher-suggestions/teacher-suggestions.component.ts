import { Component } from '@angular/core';
import { Service } from 'src/app/services/service';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Suggestions } from '../../admin/admin-suggestions/admin-suggestions.component';
@Component({
  selector: 'app-teacher-suggestions',
  templateUrl: './teacher-suggestions.component.html',
  styleUrls: ['./teacher-suggestions.component.scss']
})
export class TeacherSuggestionsComponent {
  loading = true;
  user: any
  isVisible = false;
  suggestions: Suggestions[] = [];
  newSuggestion: any = {
    title: '',
    description: '', 
  };

  constructor(private service: Service, private router: Router, private modal: NzModalService, private authService: AuthService) { 
    this.user= this.authService.getUser();
  }

  ngOnInit(): void {
    this.authService.refreshToken();
    this.fetchSuggestions();
  }

  fetchSuggestions(): void {
    this.service.getTeacherSuggestions().subscribe(
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


  showModal(): void {
    this.isVisible = true;
  }

  handleCancel(): void {
    this.isVisible = false;
    // this.resetForm();
  }
  handleOk(): void {
    
    this.service.postTeacherSuggestion(this.newSuggestion).subscribe(
      response => {
        console.log('Suggestion posted successfully:', response);
        this.isVisible = false;
        // this.resetForm();
      },
      error => {
        console.error('Failed to post suggestion:', error);
      }
    );

    this.fetchSuggestions();
  }


  trackByFn(index: number, item: any): any {
    return item.id; // or any unique identifier for the item
  }
  showDeleteConfirm(_id: any): void {
    this.modal.confirm({
      nzTitle: 'Are you sure delete this suggestion?',
      nzOkText: 'Yes',
      nzOkType: 'primary',

      nzOkDanger: true,
      nzOnOk: () => {
        // this.deleteSuggestion(_id);
        this.fetchSuggestions();
      },
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }
}
