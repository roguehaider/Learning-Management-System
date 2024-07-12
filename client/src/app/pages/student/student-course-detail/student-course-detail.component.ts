import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Service } from 'src/app/services/service';

@Component({
  selector: 'app-student-course-detail',
  templateUrl: './student-course-detail.component.html',
  styleUrls: ['./student-course-detail.component.scss'],
  providers: [DatePipe]
})
export class StudentCourseDetailComponent {

  courseName: any;
  courseId: any;

  constructor(
    private route: ActivatedRoute,
    private service: Service,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.courseName = params["name"];
      console.log(this.courseName)
    });

    this.route.queryParams.subscribe((params) => {
      this.courseId = params["id"];
    });
    this.fetchCourseDetail()  
  }

  fetchCourseDetail(): void {
    this.service.getStudentCourseById(this.courseId).subscribe(
      (response) => {
        console.log(response);
        this.fetchAssessment();
      },
      (error) => {
        console.error("Error fetching class detail:", error);
      }
    );
  }

  fetchAssessment(): void {
    this.service.getStudentAssessment(this.courseId).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.error("Error fetching class detail:", error);
      }
    );
  }
}
