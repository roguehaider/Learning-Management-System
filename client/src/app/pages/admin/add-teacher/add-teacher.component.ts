import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Service } from 'src/app/services/service';
import { Router } from '@angular/router';
import { Classes } from '../admin-attendance/admin-attendance.component';
import { Teachers } from '../admin-teacher/admin-teacher.component';
@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.scss']
})
export class AddTeacherComponent {

  selectedFile: File | null = null;
  base64String: string | null = null;

  teachers: Teachers[] = [];
  classes: Classes[] = [];

  teacherForm: any = {
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
    this.teacherForm.role= 'Teacher'
    console.log(this.teacherForm)
    this.service.registerUser(this.teacherForm)
      .subscribe(
        response => {
          console.log('Teachers added successfully:', response);
          this.router.navigate(['/admin/teacher']);
        },
        error => {
          console.error('Error adding teacher:', error);
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
      this.teacherForm.photo = this.base64String; 
    };
    reader.readAsDataURL(photo);
  }
}

