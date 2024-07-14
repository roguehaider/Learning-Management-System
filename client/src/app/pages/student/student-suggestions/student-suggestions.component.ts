import { Component } from '@angular/core';
import { Service } from 'src/app/services/service';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Suggestions } from '../../admin/admin-suggestions/admin-suggestions.component';
import { ToastService } from 'src/app/utils/toast.service';

@Component({
  selector: 'app-student-suggestions',
  templateUrl: './student-suggestions.component.html',
  styleUrls: ['./student-suggestions.component.scss']
})
export class StudentSuggestionsComponent {
  loading = true;
  user: any
  isVisible = false;
  suggestions: Suggestions[] = [];
  newSuggestion: any = {
    title: '',
    description: '', 
  };

  constructor(private service: Service, private router: Router, private modal: NzModalService, private authService: AuthService, private toastService: ToastService) { 
    this.user= this.authService.getUser();
  }

  ngOnInit(): void {
    this.authService.refreshToken();
    this.fetchSuggestions();
  }

  fetchSuggestions(): void {
    this.service.getStudentSuggestions().subscribe(
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
  }
  handleOk(): void {
    
    this.service.postStudentSuggestion(this.newSuggestion).subscribe(
      response => {
        console.log('Suggestion posted successfully:', response);
        this.toastService.showToast("success", response.message);
        this.isVisible = false;
        this.fetchSuggestions();
      },
      error => {
        console.error('Failed to post suggestion:', error);
      }
    );

  }


  trackByFn(index: number, item: any): any {
    return item.id; 
  }
  showDeleteConfirm(_id: any): void {
    this.modal.confirm({
      nzTitle: 'Are you sure delete this suggestion?',
      nzOkText: 'Yes',
      nzOkType: 'primary',

      nzOkDanger: true,
      nzOnOk: () => {
        this.fetchSuggestions();
      },
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }
}
