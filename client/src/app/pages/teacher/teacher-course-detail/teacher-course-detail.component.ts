// import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Service } from 'src/app/services/service';

@Component({
  selector: 'app-teacher-course-detail',
  templateUrl: './teacher-course-detail.component.html',
  styleUrls: ['./teacher-course-detail.component.scss']
})
export class TeacherCourseDetailComponent {
  courseName: any;
  courseId: any;

  constructor(
    private route: ActivatedRoute,
    private service: Service,
    // private datePipe: DatePipe
  ) {}
  
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.courseName = params["name"];
    });

    this.route.queryParams.subscribe((params) => {
      this.courseId = params["id"];
      this.fetchCourseDetail();
    });
  }

  fetchCourseDetail(): void {
    console.log(this.courseId)
    this.service.getTeacherCourseById(this.courseId).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.error("Error fetching class detail:", error);
      }
    );
  }
}
