import { Component } from '@angular/core';
import { Students } from '../admin-student/admin-student.component';
import { FormBuilder, Validators } from '@angular/forms';
import { Service } from 'src/app/services/service';
import { Router } from '@angular/router';
import { Classes } from '../admin-attendance/admin-attendance.component';
@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent {
  selectedFile: File | null = null;
  base64String: string | null = null;

  students: Students[] = [];
  classes: Classes[] = [];

  // studentForm: any;
  studentForm: any = {
    roll_No: '',
    Fname: '',
    Lname: '',
    DOB: null,
    email: '',
    phone: '',
    role:'',
    password: '',
    photo: ''
  };

  classId: any;
  constructor(private fb: FormBuilder, private service: Service, private router: Router) {
    this.fetchClasses();
    // this.studentForm = this.fb.group({
    //   Fname: ['', [Validators.required]],
    //   Lname: ['', [Validators.required]],
    //   DOB: ['', [Validators.required]],
    //   email: ['', [Validators.required]],
    //   password: ['', [Validators.required]],
    //   phone_No: ['', [Validators.required]],
    //   classId: ['', [Validators.required]],
    //   roll_No: ['', [Validators.required]]
    // });
  }
  fetchClasses() {
    this.service.getClasses()
      .subscribe(
        response => {
          console.log(response)
          this.classes = response.classes;
          console.log(this.classes)
        },
        error => {
          console.error('Error fetching classes:', error);
        }

      );
  }
  addStudent() {
    this.studentForm.role= 'Student'
    console.log(this.studentForm)
    this.service.registerUser(this.studentForm)
      .subscribe(
        response => {
          console.log('Students added successfully:', response);
          this.router.navigate(['/admin/student']);
        },
        error => {
          console.error('Error adding students:', error);
        }
      );
  }
   onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.convertFileToBase64(file);
    }
  }

  convertFileToBase64(photo: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.base64String = reader.result as string;
      this.studentForm.photo = this.base64String; 
    };
    reader.readAsDataURL(photo);
  }

}


