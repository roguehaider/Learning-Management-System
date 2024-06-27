import { Component } from '@angular/core';
import { Students } from '../admin-student/admin-student.component';
import { FormBuilder, Validators } from '@angular/forms';
import { Service } from 'src/app/services/service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent {
  students: Students[] = [];
  studentForm: any;
  constructor(private fb: FormBuilder, private service: Service, private router: Router) {
    this.studentForm = this.fb.group({
      Fname: ['', [Validators.required, Validators.maxLength(10)]],
      Lname: ['', [Validators.required, Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone_No: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      classId: ['', [Validators.required, Validators.pattern('^[a-fA-F0-9]{24}$')]],
      roll_No: ['', [Validators.required, Validators.maxLength(10)]]
    });
  }

  addStudent(student: any): void {
    student.role = 'Student';
    this.service.updateStudent(student)
      .subscribe(
        response => {
          console.log('Student updated successfully:', response);
          this.router.navigate(['/admin/student']);
        },
        error => {
          console.error('Error updating student:', error);
        }
      );
  }
}
