// import { DatePipe } from '@angular/common';
import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Service } from 'src/app/services/service';
import { ToastService } from 'src/app/utils/toast.service';


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
  totalStudents = 0

  isVisible = false;
  viewRemarks = false;
  newRemark: { title?: string; description?: string, reciever?: string } = {}
  selectedData: any

  studentTableVisible = false;  // Property to track table visibilit
  assessmentVisible = true;
  studentRemarkVisible = false

  assessments: { _id?: string; type?: string | null; coursename?: string; totalMarks?: number; MarksList?: any[] }[] = [];
  newAssessment: { type?: string | null; course_id?: string, TotalMarks?: number } = {}
  isAddVisible = false;

  studentRemarks: any
  meetingDetails: any;
  meetingForm: any;
  meetingPopup = false;



  constructor(
    private route: ActivatedRoute,
    private service: Service,
    private datePipe: DatePipe,
    private toastService: ToastService,
    private router: Router,
    private fb: FormBuilder,
  ) {

    const today = this.datePipe.transform(new Date(), 'yyyy-MM-dd');


    this.meetingForm = this.fb.group({
      student_id: ['', Validators.required],
      date: [today, Validators.required],
      course_id: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.courseName = params["name"];
    });

    this.route.queryParams.subscribe((params) => {
      this.courseId = params["id"];
      this.fetchCourseDetail();
      this.fetchAssessmentByCourse();
      this.fetchRemarks();
    });
  }

  fetchCourseDetail(): void {
    console.log(this.courseId)
    this.service.getTeacherCourseById(this.courseId).subscribe(
      (response) => {
        this.courseName = response.course.courseName
        this.courseId = response.course.course_Id
        this.courseDetails = response.course
        this.totalStudents = response.course.class_id.totalStudents
        this.students = response.course.class_id.students
        console.log(response);
      },
      (error) => {
        console.error("Error fetching class detail:", error);
      }
    );
  }


  formatTimestamp(isoDate: any): any {
    return this.datePipe.transform(isoDate, "mediumDate");
  }



  showModal(selected_data: any): void {
    this.selectedData = selected_data
    this.newRemark.reciever = selected_data._id
    this.isVisible = true;
  }

  handleOk(): void {
    console.log(this.newRemark)
    this.service.putRemarks(this.newRemark).subscribe(
      response => {
        console.log(response)
        this.toastService.showToast("success", response.message);
        this.newRemark.title = ''
        this.newRemark.description = ''
      },
      error => {
        console.error('Error posting diary entry:', error);
      }
    );
    this.isVisible = false;
  }

  fetchRemarks() {
    this.service.getRemarks().subscribe(
      response => {
        console.log(response)
        this.studentRemarks = response.remarks
      },
      error => {
        console.error('Error posting diary entry:', error);
      }
    );
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  viewRemarkCancel() {
    this.viewRemarks = false;
  }

  toggleStudentVisibility(): void {
    this.studentTableVisible = !this.studentTableVisible;
  }
  toggleAssessmentVisibility(): void {
    this.assessmentVisible = !this.assessmentVisible;
  }
  toggleRemarksVisibility() {
    this.studentRemarkVisible = !this.studentRemarkVisible;
  }


  //assessments
  fetchAssessmentByCourse(): void {

    this.service.getAssessmentByCourse(this.courseId)
      .subscribe(
        response => {
          this.assessments = response.AssesmentsDTO;
          console.log(response, this.assessments);
        },
        error => {
          console.error('Error fetching classes:', error);
          // Handle error, show error message, etc.
        }

      );
  }

  navigateToAssessmentMarks(assessment: any): void {
    const assessmentType = encodeURIComponent(assessment.type);
    const assessmentId = assessment._id;
    const courseName = assessment.coursename;
    const totalMarks = assessment.totalMarks;
    const courseId = this.courseId

    this.router.navigate([`/teacher/assessment/${assessmentType}`], {
      queryParams: { id: assessmentId, courseName: courseName, totalMarks: totalMarks, course_id: courseId },
    });
  }

  navigateToUpdateMarks(assessment: any): void {
    const assessmentType = encodeURIComponent(assessment.type);
    const assessmentId = assessment._id;
    const courseName = assessment.coursename;
    const totalMarks = assessment.totalMarks;
    const MarksListString = JSON.stringify(assessment.MarksList);
    this.router.navigate([`/teacher/assessment/marks/${assessmentType}`], {
      queryParams: { id: assessmentId, courseName: courseName, totalMarks: totalMarks, MarksList: MarksListString },
    });
  }


  createAssessment(): void {
    this.newAssessment.course_id = this.courseId
    console.log("assessment", this.newAssessment)
    this.service.createAssessment(this.newAssessment).subscribe(
      response => {
        console.log(response)

        this.toastService.showToast("success", response.message);
        this.fetchAssessmentByCourse();
      },
      error => {
        console.error('Error posting diary entry:', error);
      }
    );
    this.isAddVisible = false;
  }
  showAssessmentModal(): void {
    this.isAddVisible = true;
  }
  handleAssessmentCancel() {
    this.isAddVisible = false;
  }


  showMeetingModal(): void {
    this.meetingPopup = true;
  }


  meetingPopupCancel(): void {
    console.log('Button cancel clicked!');
    this.meetingPopup = false;
  }

  onSubmit(student: any) {
    console.log(student)
    this.meetingForm.patchValue({ course_id: this.courseId });
    this.meetingForm.patchValue({ student_id: student._id });

    if (this.meetingForm.valid) {
      this.service.generateMeetingLink(this.meetingForm.value).subscribe(
        (response) => {
          console.log('Meeting link generated:', response.link);
          this.meetingPopup = false;

          const fullUrl = response.link.startsWith('http') ? response.link : `http://${response.link}`;
          window.location.href = fullUrl;
          alert(`Meeting link generated: ${response.link}`);
        },
        (error) => {
          console.error('Error generating meeting link:', error);
          // this.toastService.showToast("error", error);

          alert('Error generating meeting link.');
        }
      );
    }
    else{
      console.log("form not valid", this.meetingForm.value)
    }
  }
}
