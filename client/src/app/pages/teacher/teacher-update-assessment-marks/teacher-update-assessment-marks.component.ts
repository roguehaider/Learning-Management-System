import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Service } from 'src/app/services/service';
import { ToastService } from 'src/app/utils/toast.service';

@Component({
  selector: 'app-teacher-update-assessment-marks',
  templateUrl: './teacher-update-assessment-marks.component.html',
  styleUrls: ['./teacher-update-assessment-marks.component.scss']
})
export class TeacherUpdateAssessmentMarksComponent {
  assessmentType!: string | null;
  assessmentId!: string | null;
  courseName: any;
  courseId: any
  totalMarks!: string | null;
  MarksList: any;

  isVisible = false;

  selectedData: any; // Variable to store the selected row's data

  constructor(private route: ActivatedRoute, private service: Service, private toastService: ToastService, private router: Router){}

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
      this.MarksList =  params.get('MarksList')
      this.MarksList =  this.MarksList ? JSON.parse(this.MarksList) : null; // Parse MarksList from JSON string
    });
    console.log(this.MarksList)
  }

  showModal(data: any): void {
    this.selectedData = data; // Set selectedData to the data of the clicked row

    this.isVisible = true;
  }

  handleOk(): void {
    const data ={assesment_id: this.assessmentId, student_id: this.selectedData.student._id, obtained_marks: this.selectedData.obtained_marks }
    console.log('Button ok clicked!', data);
    this.service.updateAssessmentMarks(data).subscribe(
      response => {
        console.log(response)
        this.toastService.showToast("success", response.message);
      },
      error => {
        console.error('Error posting diary entry:', error);
      }
    );
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

}
