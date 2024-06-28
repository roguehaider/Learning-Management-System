import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Service } from 'src/app/services/service';
import { AuthService } from 'src/app/services/auth/auth.service';
export interface Teachers {
  key: string;
  _id: string;
  Fname: string;
  Lname: string;
  email: string;
}
@Component({
  selector: 'app-admin-teacher',
  templateUrl: './admin-teacher.component.html',
  styleUrls: ['./admin-teacher.component.scss']
})
export class AdminTeacherComponent {
  isVisible = false;
  teachers: Teachers[] = [ ];
  selectedTeacher: Partial<Teachers> = {
    _id: '',
    Fname: '',
    Lname: '',
    email: '',
  }

  constructor(private router: Router,private modal: NzModalService, private service: Service, private authService: AuthService) {}
  ngOnInit(): void {
    this.authService.refreshToken();

    this.fetchTeachers();
  }
  fetchTeachers(): void {
    this.service.getTeacher()
      .subscribe(
        response => {
         this.teachers = response.TeachersDto;
         console.log(this.teachers,response)
         
        },
        error => {
          console.error('Error fetching students:', error);
          // Handle error, show error message, etc.
        }
        
      );
  }

  updateTeacher(teacher: any): void {
    teacher.role = 'Teacher';
    this.service.updateTeacher(teacher)
      .subscribe(
        response => {
          console.log('Student updated successfully:', response);
          this.fetchTeachers();
        },
        error => {
          console.error('Error updating student:', error);
        }
      );
  }

  navigateToApprove() {
    this.router.navigate(['/admin/approve-teacher']); 
  }
  navigateToAdd() {
    this.router.navigate(['/admin/add-teacher']); 
  }

  showDeleteConfirm(name: any): void {
    this.modal.confirm({
      nzTitle: `Are you sure remove ${name}?`,
      // nzContent: '<b style="color: red;">Some descriptions</b>',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => console.log('OK'),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }
  showModal(teacher: any): void {
    // Exclude 'class' field and any other fields not required for update
    const { _id, Fname, Lname, email,} = teacher;
    this.selectedTeacher = { _id, Fname, Lname, email};
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!', this.selectedTeacher);
    this.updateTeacher(this.selectedTeacher);
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
}
