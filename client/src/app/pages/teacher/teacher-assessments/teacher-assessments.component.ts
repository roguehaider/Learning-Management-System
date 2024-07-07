import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from 'src/app/services/service';

@Component({
  selector: 'app-teacher-assessments',
  templateUrl: './teacher-assessments.component.html',
  styleUrls: ['./teacher-assessments.component.scss']
})
export class TeacherAssessmentsComponent {
  isAddVisible = false;

  newAssessment: { type?: string | null; course_id?: string, TotalMarks?: number } = {}
  assessments: { _id?: string; type?: string | null; coursename?: string; totalMarks?: number; MarksList?: any[] }[] = [];
  courses: any;
  courseId: any;

  constructor(private service: Service, private router: Router){}
  
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
    console.log("assessment",this.newAssessment)
    this.service.createAssessment(this.newAssessment).subscribe(
      response => {
        console.log(response)
      },
      error => {
        console.error('Error posting diary entry:', error);
      }
    );
    this.isAddVisible = false;
  }
  showModal(): void {
    this.isAddVisible = true;
  }
  handleCancel(){
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
