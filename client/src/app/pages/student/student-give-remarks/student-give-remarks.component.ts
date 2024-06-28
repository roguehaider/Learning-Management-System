import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Service } from 'src/app/services/service';
import { Teachers } from '../../admin/admin-teacher/admin-teacher.component';
@Component({
  selector: 'app-student-give-remarks',
  templateUrl: './student-give-remarks.component.html',
  styleUrls: ['./student-give-remarks.component.scss']
})
export class StudentGiveRemarksComponent {
  teachers: Teachers[] =[] 
  newRemark = {
    title: '',
    description: '',
    reciever: ''
  };
  loading = false;

  constructor(private service: Service, private router: Router, private authService: AuthService) {
    this.authService.refreshToken();
  }

  postRemark(): void {
    this.loading = true;
    this.service.postStudentRemarks(this.newRemark).subscribe(
      (response: any) => {
        console.log('Remark posted successfully:', response);
        this.loading = false;
        this.newRemark = {
          title: '',
          description: '',
          reciever: ''
        };
      },
      (error: any) => {
        console.error('Error posting remark:', error);
        this.loading = false;
      }
    );
  }
}
