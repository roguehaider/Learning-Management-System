import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Service } from 'src/app/services/service';
import { Teachers } from '../admin-teacher/admin-teacher.component';
import { DatePipe } from '@angular/common';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-admin-class-detail',
  templateUrl: './admin-class-detail.component.html',
  styleUrls: ['./admin-class-detail.component.scss'],
  providers: [DatePipe]

})
export class AdminClassDetailComponent {
  isVisible = false;

  classId!: string;
  classDetail: any;
  className!: string;

  assignedTeacherId!: string;
  assignedTeacherName: string | null = null;

  totalCourses!: string;

  totalStudents!: string;
  studentsId: any[] = [];
  studentDetails: any[] = [];  // To store the details of matched students

  coursesId: any[] = [];
  teachers: Partial<Teachers> = {
    _id: '',
    Fname: '',
    Lname: '',
    email: '',
    phone: '',
    DOB: '',
  }


  constructor(private route: ActivatedRoute, private service: Service, private datePipe: DatePipe,  private modal: NzModalService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.className = params['name'];
    });

    this.route.queryParams.subscribe(params => {
      this.classId = params['id'];
      this.fetchClassDetail();
      this.fetchTeachers();
      this.fetchStudents();

    });
  }

  fetchClassDetail(): void {
    this.service.getClassById(this.classId).subscribe(
      response => {
        console.log(response)
        this.classDetail = response.class;
        if (response.class.teacher_id) {
          this.assignedTeacherId = response.class.teacher_id;
        }
        if (response.class.totalStudents) {
          this.totalStudents = response.class.totalStudents;
        }
      },
      error => {
        console.error('Error fetching class detail:', error);
      }
    );
  }
  fetchTeachers(): void {
    this.service.getTeacher().subscribe(
      response => {
        
        const teachers = response.TeachersDto;
        console.log( response);
        teachers.forEach((teacher: { _id: string; Fname: any; Lname: any; }) => {
          if (teacher._id === this.assignedTeacherId) {
            console.log("match")
            this.assignedTeacherName = `${teacher.Fname} ${teacher.Lname}`;
          }
          
        });
      },
      error => {
        console.error('Error fetching teachers:', error);
      }
    );
  }

  fetchStudents(): void {
    this.service.getStudents().subscribe(
      response => {
        console.log(response.students);
        const allStudents = response.students;
        this.studentDetails = []; // Resetting the student details array
        // Nested loops to match student IDs
        allStudents.forEach((student: any ) => {
          this.classDetail.students.forEach((classStudentId: any) => {
            if (student._id === classStudentId) {
              this.studentDetails.push(student);
            }
          });
        });
        console.log('Matched Students:', this.studentDetails);
      },
      error => {
        console.error('Error fetching students:', error);
      }
    );
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
  formatTimestamp(isoDate: any): any {
    return this.datePipe.transform(isoDate, 'mediumDate');
  }

  showDeleteConfirm(data: any): void {
    this.modal.confirm({
      nzTitle: `Are you sure you want to remove ${data.Fname}?`,
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        console.log('Deleting user with ID:', data._id);  // Log the user ID for debugging

        // Make the HTTP request to delete the user
        this.service.deleteUser(data._id).subscribe(
          response => {
            console.log('User deleted successfully', response);
            // this.userId = '';  // Reset the user ID field
            this.fetchStudents();
          },
          error => {
            console.error('Error deleting user', error);
          }
        );
      },
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }
}
