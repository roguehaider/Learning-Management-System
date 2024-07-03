import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Service } from 'src/app/services/service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DatePipe } from '@angular/common';

export interface Teachers {
  key: string;
  _id: string;
  Fname: string;
  Lname: string;
  email: string;
  phone: string;
  DOB: string;
  role: string;
}
@Component({
  selector: 'app-admin-teacher',
  templateUrl: './admin-teacher.component.html',
  styleUrls: ['./admin-teacher.component.scss'],
  providers: [DatePipe]
})
export class AdminTeacherComponent {
  isVisible = false;
  teachers: Teachers[] = [ ];
  selectedTeacher: Partial<Teachers> = {
    _id: '',
    Fname: '',
    Lname: '',
    email: '',
    phone: '',
    DOB: '',
    role: ''

  }

  constructor(private router: Router,private modal: NzModalService, private service: Service, private authService: AuthService, private datePipe: DatePipe) {}
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
  navigateToAdd(): void {
    this.router.navigate(['/admin/add-teacher']); 
  }

  showDeleteConfirm(data: any): void {
    this.modal.confirm({
      nzTitle: `Are you sure remove ${data.Fname}?`,
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () =>{
        console.log('Deleting user with ID:', data._id); 

        this.service.deleteUser(data._id).subscribe(
          response => {
            console.log('User deleted successfully', response);
            this.fetchTeachers();
          },
          error => {
            console.error('Error deleting user', error);
          }
        );
      },
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }
  showModal(teacher: any): void {
    const { _id, Fname, Lname, email, phone, DOB, role} = teacher;
    this.selectedTeacher = { _id, Fname, Lname, email, phone, DOB, role};
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
  formatTimestamp(isoDate: any): any {
    return this.datePipe.transform(isoDate, 'mediumDate');
  }
}
