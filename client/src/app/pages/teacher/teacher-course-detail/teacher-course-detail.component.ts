// import { DatePipe } from '@angular/common';
import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Service } from 'src/app/services/service';


@Component({
  selector: 'app-teacher-course-detail',
  templateUrl: './teacher-course-detail.component.html',
  styleUrls: ['./teacher-course-detail.component.scss'],
  providers: [DatePipe]
})
export class TeacherCourseDetailComponent {
  courseName: any;
  courseId: any;
  students: any;
  courseDetails: any;
  totalStudents= 0
  
  constructor(
    private route: ActivatedRoute,
    private service: Service,
    private datePipe: DatePipe
  ) {}
  
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.courseName = params["name"];
    });

    this.route.queryParams.subscribe((params) => {
      this.courseId = params["id"];
      this.fetchCourseDetail();
      // this.fetchStudents();
    });
  }

  fetchCourseDetail(): void {
    console.log(this.courseId)
    this.service.getTeacherCourseById(this.courseId).subscribe(
      (response) => {
        this.courseName= response.course.courseName
        this.courseId= response.course.course_Id
        this.courseDetails= response.course
        this.totalStudents= response.course.class_id.totalStudents
        this.students= response.course.class_id.students
        console.log(response);
      },
      (error) => {
        console.error("Error fetching class detail:", error);
      }
    );
  }
  // fetchStudents() {
  //   this.service.getStudentsOfClass()
  //     .subscribe(
  //       response => {
  //         this.students = response.students
  //         console.log(response);
  //       },
  //       error => {
  //         console.error('Error fetching classes:', error);
  //         // Handle error, show error message, etc.
  //       }

  //     );
  // }

  formatTimestamp(isoDate: any): any {
    return this.datePipe.transform(isoDate, "mediumDate");
  }
 
}
