import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Service } from 'src/app/services/service';
import { Teachers } from '../admin-teacher/admin-teacher.component';
export interface Courses {
  course_id: string;
  name: string;
  description: string;
  teacher_id: string;
}
@Component({
  selector: 'app-admin-courses',
  templateUrl: './admin-courses.component.html',
  styleUrls: ['./admin-courses.component.scss']
})
export class AdminCoursesComponent {

  isVisible = false;
  isAddVisible = false;

  courses: Courses[] = [ ];
  teachers: Teachers[] = [ ];

  newCourse: Partial<Courses> = {
    name: '',
    description: '',
    teacher_id: ''
  }
  constructor(private router: Router,private modal: NzModalService, private service: Service) {}
  ngOnInit(): void {
    this.fetchTeachers()
    this.fetchCourses();
  }
  fetchCourses(): void {
    this.service.getCourses()
      .subscribe(
        response => {
          console.log(response)
         this.courses = response.courses;
         console.log(this.courses)
        },
        error => {
          console.error('Error fetching classes:', error);
          // Handle error, show error message, etc.
        }
        
      );
  }

  navigateToAdd() {
    this.router.navigate(['/admin/add-teacher']); 
  }

  showDeleteConfirm(name: any): void {
    this.modal.confirm({
      nzTitle: `Are you sure remove ${name}?`,
      // nzContent: '<b style="color: red;">Some descriptions</b>',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => console.log('OK'),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }

  fetchTeachers(): void {
    this.service.getTeacher()
      .subscribe(
        response => {
         this.teachers = response.TeachersDto;
         console.log(this.teachers,response)
         
        },
        error => {
          console.error('Error fetching students:', error);
          // Handle error, show error message, etc.
        }
        
      );
  }
  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');

    this.service.createCourse(this.newCourse)
      .subscribe(
        response => {
          console.log('Course created successfully:', response);
          this.isVisible = false;
          this.fetchCourses();
          this.newCourse = { name: '' , description: ''};        },
        error => {
          console.error('Error creating course:', error);
        }
      )
  
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  
  navigateToCourseDetail(courseDetail: any): void {
    const courseName = encodeURIComponent(courseDetail.name);
    const courseId = courseDetail._id;
    this.router.navigate([`/admin/course-detail/${courseName}`], { queryParams: { id: courseId } });
  }

}
