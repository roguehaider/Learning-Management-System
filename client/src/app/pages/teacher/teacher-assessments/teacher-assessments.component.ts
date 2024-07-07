import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/services/service';
import { ToastService } from 'src/app/utils/toast.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teacher-assessments',
  templateUrl: './teacher-assessments.component.html',
  styleUrls: ['./teacher-assessments.component.scss']
})
export class TeacherAssessmentsComponent implements OnInit {
  isAddVisible = false;
  newAssessmentForm: FormGroup;
  assessments: { _id?: string; type?: string | null; coursename?: string; totalMarks?: number; MarksList?: any[] }[] = [];
  courses: any;
  courseId: any;

  constructor(
    private service: Service,
    private fb: FormBuilder,
    private toastService: ToastService,
    private router:Router
  ) {
    // Initialize the form
    this.newAssessmentForm = this.fb.group({
      type: [null, Validators.required],
      course_id: ['', Validators.required],
      TotalMarks: [null, Validators.required]
    });
  }

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


  createAssessment(): void {
    if (this.newAssessmentForm.valid) {
      console.log('assessment', this.newAssessmentForm.value);
      this.service.createAssessment(this.newAssessmentForm.value).subscribe(
        response => {
          console.log(response);
          this.toastService.showToast('success', 'Assessment Added Successfully!');
          this.newAssessmentForm.reset(); // Reset form values
          this.isAddVisible = false; // Hide the form
        },
        error => {
          console.error('Error posting Assessment entry:', error);
          const errorMessage = error.message ? error.message : 'An error occurred';
          this.toastService.showToast('error', errorMessage);
        }
      );
    }
  }

  showModal(): void {
    this.newAssessmentForm.reset(); // Reset form values when showing the modal
    this.isAddVisible = true;
  }

  handleCancel(): void {
    this.isAddVisible = false;
  }
 
  navigateToAssessmentMarks(assessment: any): void {
    const assessmentType = encodeURIComponent(assessment.type);
    const assessmentId = assessment._id;
    const courseName = assessment.coursename;
    const totalMarks = assessment.totalMarks;

    this.router.navigate([`/teacher/assessment/${assessmentType}`], {
      queryParams: { id: assessmentId, courseName: courseName, totalMarks: totalMarks },
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
}
