import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Service } from 'src/app/services/service';

@Component({
  selector: 'app-admin-course-detail',
  templateUrl: './admin-course-detail.component.html',
  styleUrls: ['./admin-course-detail.component.scss']
})
export class AdminCourseDetailComponent {
  courseId!: string;
  courseDetail: any;
  courseName!: string;
  assignedTeacherId!: string;
  totalCourses!: string;
  totalStudents!: string;
  studentsId: any[] = [];
  coursesId: any[] = [];


  constructor(private route: ActivatedRoute,private service: Service){}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.courseName = params['name'];
    });

    this.route.queryParams.subscribe(params => {
      this.courseId = params['id'];
      this.fetchClassDetail();
    });
    }

    fetchClassDetail(): void {
      this.service.getCourseById(this.courseId).subscribe(
        response => {
          console.log(response)
          this.courseDetail = response;
        },
        error => {
          console.error('Error fetching class detail:', error);
        }
      );
    }


}
