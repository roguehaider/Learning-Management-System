import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
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
export interface CourseDetail {
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

  assessmentVisible = true;
  remarkVisible = false;

  meetingDetails: any;
  meetingLinkForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private service: Service,
    private datePipe: DatePipe,
    private toastService: ToastService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    const today = this.datePipe.transform(new Date(), 'yyyy-MM-dd');

    this.meetingLinkForm = this.fb.group({
      teacher_id: ['', Validators.required],
      date: [today, Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      console.log(this.courseName)
    });

    this.route.queryParams.subscribe((params) => {
      this.courseId = params["id"];
    });
    this.refreshToken();
    this.fetchCourseDetail()
  }

  refreshToken() {
    this.authService.refreshToken().subscribe(
      (response) => {
        console.log(response)
      },
      (error) => {
        console.error("Error fetching class detail:", error);
      }
    );
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
          ObtainedMarks: assessment.Marks[0].obtained_marks
        }));
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
    this.newRemark.reciever = this.teacher_id
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

  fetchMeetingDetails() {
    this.meetingLinkForm.patchValue({ teacher_id: this.teacher_id });
    if (this.meetingLinkForm.valid) {

      // Use `this.meetingForm.value`, which is a plain object
      const formValue = this.meetingLinkForm.value;
      console.log('Form values:', formValue); // Debugging
      // Use `this.meetingForm.value` which is a plain object
      this.service.getMeetingLink(this.meetingLinkForm).subscribe(
        (response) => {
          console.log('Meeting link:', response.link);
          alert(`Meeting link: ${response.link}`);
        },
        (error) => {
          console.error('Error fetching meeting link:', error);
          alert('Error fetching meeting link.');
        }
      );
    } else {
      console.log("Form not valid", this.meetingLinkForm.value);
    }
  }
}
