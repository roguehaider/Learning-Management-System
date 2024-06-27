import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from 'src/app/services/service';
// import { Courses } from '../../admin/admin-courses/admin-courses.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface Diary {
  _id: string;
  description: string;
  date: string;
  courseName: string;
}

@Component({
  selector: 'app-teacher-diary',
  templateUrl: './teacher-diary.component.html',
  styleUrls: ['./teacher-diary.component.scss']
})
export class TeacherDiaryComponent {
  isVisible = false;
   diary: Diary[] = [];
  // courses: Courses[] = [ ];
  diaryForm: FormGroup;


  constructor(private router: Router, private service: Service, private fb: FormBuilder,
  ) {
    this.diaryForm = this.fb.group({
      course_id: ['', [Validators.required]],
      description: ['', [Validators.required]],
      date: ['', [Validators.required]]
    });
  }
  ngOnInit(): void {
    // this.fetchCourses();
    this.fetchDiaries();
  }
  fetchDiaries(): void {
    this.service.getTeacherDiaries().subscribe(
      response => {
        this.diary = response.diaries;
        console.log(response)
      },
      error => {
        console.error('Error fetching diaries:', error);
      }
    );
  }
  // fetchCourses(): void {
  //   this.service.getTeacherCourses()
  //     .subscribe(
  //       response => {
  //         this.courses = response.course;
  //         console.log(response, this.courses);
  //       },
  //       error => {
  //         console.error('Error fetching classes:', error);
  //         // Handle error, show error message, etc.
  //       }
        
  //     );
  // }
  submitDiary(id:any): void {
    this.diaryForm.value.course_id = id;
    // if (this.diaryForm.valid) {
      this.service.postDiary(this.diaryForm.value).subscribe(
        response => {
          console.log(response)
        },
        error => {
          console.error('Error posting diary entry:', error);
        }
      );
  }
  showModal(): void {
    this.isVisible = true;
  }

  handleOk(data: any): void {
    console.log('Button ok clicked!',data);
    this.submitDiary(data._id);
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
  navigateToView(){
    this.router.navigate(['/teacher/view-diary']);
  }
}
