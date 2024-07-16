import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Service } from 'src/app/services/service';
import { ToastService } from 'src/app/utils/toast.service';
export interface Assessment {
  _id: string;
  type: string;
  TotalMarks: string;
  ObtainedMarks: string;
}
export interface Remarks {
  _id: string;
  reciever: string;
  title: string;
  description: string;
}
export interface CourseDetail{
  _id: string;
  name: string;
  teacher_id: string;
  teacherFName: string;
  teacherLName: string;

}

@Component({
  selector: 'app-student-course-detail',
  templateUrl: './student-course-detail.component.html',
  styleUrls: ['./student-course-detail.component.scss'],
  providers: [DatePipe]
})
export class StudentCourseDetailComponent {

  isVisible = false;
  courseName: any;
  courseTeacher!: string;
  courseId: any;
  teacher_id: string = ""
  assessments: Assessment[] = [];
  remarks: Remarks[] = []
  courseDetail: Partial<CourseDetail> = {
    name: "",
    teacherFName: "",
    teacherLName: "",
    teacher_id: "",
  };

  newRemark: Partial<Remarks> = {
    reciever: '',
    title: '',
    description: ''
  }

  assessmentVisible =  true;
  remarkVisible = false;

  constructor(
    private route: ActivatedRoute,
    private service: Service,
    private datePipe: DatePipe,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
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
        this.courseName = response.course.name
        this.teacher_id = response.course.teacher_id
        const teacherFName = response.course.teacherFName;
        const teacherLName = response.course.teacherLName;
        this.courseTeacher = `${teacherFName} ${teacherLName}`;
        this.fetchAssessment();
        this.fetchRemarks();
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
        this.assessments = response.assesment.map((assessment: any) => ({
          _id: assessment._id,
          type: assessment.type,
          TotalMarks: assessment.TotalMarks,
          ObtainedMarks: assessment.Marks[0].obtained_marks }));
      },
      (error) => {
        console.error("Error fetching class detail:", error);
      }
    );
  }


  fetchRemarks(): void {
    this.service.getStudentRemarks(this.courseId).subscribe(
      (response) => {
        this.remarks = response.remarks
        console.log(response);        
      },
      (error) => {
        console.error("Error fetching class detail:", error);
      }
    );
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.newRemark.reciever= this.teacher_id
    console.log('Button ok clicked!', this.newRemark);
    this.service.postTeacherRemarks(this.newRemark).subscribe(
      (response) => {
        console.log(response); 
        this.toastService.showToast("success", response.message);       
      },
      (error) => {
        console.error("Error fetching class detail:", error);
      }
    );
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  toggleAssessmentVisibility(): void {
    this.assessmentVisible = !this.assessmentVisible;
  }

  toggleRemarkVisibility(): void {
    this.remarkVisible = !this.remarkVisible;
  }
}
