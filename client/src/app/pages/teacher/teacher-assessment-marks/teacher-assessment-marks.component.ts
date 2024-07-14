import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Service } from 'src/app/services/service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-teacher-assessment-marks',
  templateUrl: './teacher-assessment-marks.component.html',
  styleUrls: ['./teacher-assessment-marks.component.scss']
})
export class TeacherAssessmentMarksComponent {
  assessmentId: string | null = null;
  assessmentType: string | null = null;
  students: any;
  courseName: any;
  courseId: any
  totalMarks: string | null = null;
  studentMarks: { student: string, obtained_marks: number }[] = [];


  obtainedMarks: any;
  constructor(
    private route: ActivatedRoute,
    private service: Service,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Retrieve the route parameter
    this.route.paramMap.subscribe((params) => {
      this.assessmentType = params.get('assessmentType');
    });

    // Retrieve the query parameters
    this.route.queryParamMap.subscribe((params) => {
      this.assessmentId = params.get('id');
      this.courseName = params.get('courseName');
      this.totalMarks = params.get('totalMarks');
      this.courseId = params.get('course_id')
    });
    this.fetchStudents();
  }

  addStudentMarks(studentId: string, obtained_marks: number) {
    // Check if studentId already exists in studentMarks array
    const existingStudentIndex = this.studentMarks.findIndex(mark => mark.student === studentId);

    if (existingStudentIndex !== -1) {
      // Update existing record
      this.studentMarks[existingStudentIndex].obtained_marks = obtained_marks;
    } else {
      // Push new record
      this.studentMarks.push({ student: studentId, obtained_marks });
    }
  }



  submitMarks(): void {
    const data = { assesment_id: this.assessmentId, MarksList: this.studentMarks }

    console.log(this.studentMarks, this.assessmentId, data)

    this.service.putAssessmentMarks(data).subscribe(
      response => {
        console.log(response)

        const courseName =  encodeURIComponent(this.courseName);
        const courseId = this.courseId;
        this.router.navigate([`/teacher/course-detail/${courseName}`], {
          queryParams: { id: courseId },
        });
      },
      error => {
        console.error('Error posting diary entry:', error);
      }
    );
  }

  fetchStudents() {
    this.service.getStudentsOfClass()
      .subscribe(
        response => {
          this.students = response.students
          console.log(response);
        },
        error => {
          console.error('Error fetching classes:', error);
          // Handle error, show error message, etc.
        }

      );
  }
}
