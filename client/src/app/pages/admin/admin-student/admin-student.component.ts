import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Service } from 'src/app/services/service';
import { AuthService } from 'src/app/services/auth/auth.service';

export interface Students {
  _id: string;
  Fname: string;
  Lname: string;
  roll_No: string;
  email: string;
  DOB: string;
  phone: string;
  role: string;
  password: string; 
  photo: string;
}

@Component({
  selector: 'app-admin-student',
  templateUrl: './admin-student.component.html',
  styleUrls: ['./admin-student.component.scss']
})
export class AdminStudentComponent {
  date = null;
  isVisible = false;
  students: Students[] = [];
  selectedStudent: Partial<Students> = {
    roll_No: '',
    Fname: '',
    Lname: '',
    email: '',
    role: '',
    DOB: ''
  }

  constructor(private router: Router, private modal: NzModalService, private service: Service, private authService:AuthService) {}

  ngOnInit(): void {
    this.authService.refreshToken();
    this.fetchStudents();
  }

  fetchStudents(): void {
    this.service.getStudents()
      .subscribe(
        response => {
         this.students = response.students;
         console.log(this.students);
        },
        error => {
          console.error('Error fetching students:', error);
        }
      );
  }

  updateStudent(student: any): void {
    student.role = 'Student';
    this.service.updateStudent(student)
      .subscribe(
        response => {
          console.log('Student updated successfully:', response);
          this.fetchStudents();
        },
        error => {
          console.error('Error updating student:', error);
        }
      );
  }

  navigateToApprove(): void {
    this.router.navigate(['/admin/approve-student']); 
  } 

  navigateToAdd(): void {
    this.router.navigate(['/admin/add-student']); 
  } 

  showDeleteConfirm(name: any): void {
    this.modal.confirm({
      nzTitle: `Are you sure you want to remove ${name}?`,
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => console.log('OK'),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }

  showModal(student: any): void {
    // Exclude 'class' field and any other fields not required for update
    const { _id, Fname, Lname, roll_No, email, DOB, phone, role, password, photo } = student;
    this.selectedStudent = { _id, Fname, Lname, roll_No, email, DOB, phone, role, password, photo };
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!', this.selectedStudent);
    this.updateStudent(this.selectedStudent);
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
}
