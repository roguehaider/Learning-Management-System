import { Component } from '@angular/core';
import { Service } from 'src/app/services/service';

@Component({
  selector: 'app-teacher-remarks',
  templateUrl: './teacher-remarks.component.html',
  styleUrls: ['./teacher-remarks.component.scss']
})
export class TeacherRemarksComponent {
  courses: any
  courseId: any
  students: any;
  isVisible = false;
  newRemark: { title?: string; description?: string, reciever?: string } = {}
 selectedData: any
  constructor(private service: Service){ }

  ngOnInit(): void {
    this.fetchCourses();
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
  fetchStudents() {
    this.service.getStudentsOfClass()
      .subscribe(
        response => {
          this.students = response.students
          console.log(response);
        },
        error => {
          console.error('Error fetching classes:', error);
          // Handle error, show error message, etc.
        }

      );
  }

  showModal(selected_data: any): void {
    this.selectedData =  selected_data
    this.newRemark.reciever= selected_data._id
    this.isVisible = true;
  }

  handleOk(): void {
    console.log(this.newRemark)
    this.service.putRemarks(this.newRemark).subscribe(
      response => {
        console.log(response)
      },
      error => {
        console.error('Error posting diary entry:', error);
      }
    );
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
}
