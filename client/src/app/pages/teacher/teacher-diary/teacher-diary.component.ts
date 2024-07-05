import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from 'src/app/services/service';
import { Courses } from '../../admin/admin-courses/admin-courses.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

export interface Diary {
  _id: string;
  description: string;
  date: string;
  courseName: string;
}

@Component({
  selector: 'app-teacher-diary',
  templateUrl: './teacher-diary.component.html',
  styleUrls: ['./teacher-diary.component.scss'],
  providers: [DatePipe]
})
export class TeacherDiaryComponent {
  isVisible = false;
  diary: any[] = [];
  courses: any[] = []; 
  getDate: any

  newDiary: { date?: string | null; course_id?: string, description?: string } = {};


  constructor(private router: Router, private service: Service, private fb: FormBuilder, private datePipe: DatePipe) {

  }
  ngOnInit(): void {
    this.fetchCourses();
    // this.fetchDiaries();
  }
  fetchDiaries(): void {
    this.getDate = this.formatTimestamp(this.getDate)
    this.service.getTeacherDiaries(this.getDate).subscribe(
      response => {
        console.log(response)
      },
      error => {
        console.error('Error fetching diaries:', error);
      }
    );
  }
  fetchCourses(): void {
    this.service.getTeacherCourses()
      .subscribe(
        response => {
          this.courses = response.course;
          console.log(response, this.courses);
        },
        error => {
          console.error('Error fetching classes:', error);
          // Handle error, show error message, etc.
        }

      );
  }
  postDiary(): void {
    // if (this.diaryForm.valid) {
    this.newDiary.date = this.formatTimestamp(this.newDiary.date)
    console.log("nd",this.newDiary.date)
    this.service.postDiary(this.newDiary).subscribe(
      response => {
        this.diary= response.diaries
        console.log(response)
      },
      error => {
        console.error('Error posting diary entry:', error);
      }
    );
  }
  formatTimestamp(date: any) {
    return this.datePipe.transform(date, 'yyyy-MM-dd'); 
  }
  showModal(): void {
    this.isVisible = true;
  }


  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
  navigateToView() {
    this.router.navigate(['/teacher/view-diary']);
  }
}
