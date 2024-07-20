import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from 'src/app/services/service';
import { Courses } from '../../admin/admin-courses/admin-courses.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { AnimationQueryMetadata } from '@angular/animations';
import { ToastService } from 'src/app/utils/toast.service';

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
  isEditVisible = false;
  
  courses: any[] = []; 
  getDate: any

  newDiary: { date?: string | null; course_id?: string, description?: string } = {};
  diaryData: any;
  editDiary: { diary_id?: string; description?: string; } = {}
  


  constructor(private router: Router, private service: Service, private fb: FormBuilder, private datePipe: DatePipe, private toastService: ToastService) {

  }
  ngOnInit(): void {
    this.fetchCourses();
    // this.fetchDiaries();
  }
  fetchDiaries(): void {
    const formattedDate = this.formatTimestamp(this.getDate);
    if (formattedDate) {
      this.service.getTeacherDiaries(formattedDate).subscribe(
        (response: any) => {
          const diaryData = response;
          this.diaryData = diaryData.diaries
          console.log('diaryData', this.diaryData);
        },
        error => {
          console.error('Error fetching diaries:', error);
        }
      );
    }
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
    this.diaryData= '';
    this.newDiary.date = this.formatTimestamp(this.newDiary.date)
    console.log("nd",this.newDiary.date)
    this.service.postDiary(this.newDiary).subscribe(
      response => {
        this.diaryData= response
        console.log(response, this.diaryData)
        this.toastService.showToast("success", response.message);
      },
      error => {
        console.error('Error posting diary entry:', error);
      }
    );
    this.isVisible = false
  }
  updateDiary(){
    console.log(this.editDiary)
    this.service.updateTeacherDiary(this.editDiary).subscribe(
      response => {
        this.diaryData= response
        console.log(response, this.diaryData)
        this.toastService.showToast("success", response.message);
      },
      error => {
        console.error('Error posting diary entry:', error);
      }
    );
    this.getDate= ""
    this.fetchDiaries();
    this.isEditVisible = false
  }
  formatTimestamp(date: any) {
    return this.datePipe.transform(date, 'yyyy-MM-dd'); 
  }
  showModal(): void {
    this.isVisible = true;
  }
  showEditModal(data: any): void {
    this.editDiary= {description: data.description, diary_id: data._id }
    console.log(this.editDiary)
    this.isEditVisible = true;
  }


  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
  handleEditCancel(): void {
    console.log('Button cancel clicked!');
    this.isEditVisible = false;
  }
  navigateToView() {
    this.router.navigate(['/teacher/view-diary']);
  }
}