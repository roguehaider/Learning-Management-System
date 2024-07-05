import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { NzModalService } from "ng-zorro-antd/modal";
import { Service } from "src/app/services/service";
import { AuthService } from "src/app/services/auth/auth.service";
import { DatePipe } from "@angular/common";
export interface Students {
  _id: string;
  Fname: string;
  Lname: string;
  roll_No: string;
  email: string;
  DOB: string;
  phone: string;
  role: string;
  password: string;
  photo: string;
}
import { ToastService } from "src/app/utils/toast.service";

@Component({
  selector: "app-admin-student",
  templateUrl: "./admin-student.component.html",
  styleUrls: ["./admin-student.component.scss"],
  providers: [DatePipe],
})
export class AdminStudentComponent {
  date = null;
  isVisible = false;
  students: Students[] = [];
  selectedStudent: Partial<Students> = {
    roll_No: "",
    Fname: "",
    Lname: "",
    email: "",
    role: "",
    DOB: "",
  };

  constructor(
    private router: Router,
    private toastService: ToastService,
    private modal: NzModalService,
    private service: Service,
    private authService: AuthService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.authService.refreshToken();
    this.fetchStudents();
  }

  fetchStudents(): void {
    this.service.getStudents().subscribe(
      (response) => {
        this.students = response.students;
        console.log(this.students);
      },
      (error) => {
        console.error("Error fetching students:", error);
      }
    );
  }

  updateStudent(student: any): void {
    student.role = "Student";
    this.service.updateStudent(student).subscribe(
      (response) => {
        console.log("Student updated successfully:", response);
        this.toastService.showToast(
          "success",
          "Student Updated Successfully! "
        );
        this.fetchStudents();
      },
      (error) => {
        console.error("Error updating student:", error);
        const errorMessage = error.message
          ? error.message
          : "An error occurred";
        this.toastService.showToast("error", errorMessage);
      }
    );
  }

  navigateToApprove(): void {
    this.router.navigate(["/admin/approve-student"]);
  }

  navigateToAdd(): void {
    this.router.navigate(["/admin/add-student"]);
  }

  showDeleteConfirm(data: any): void {
    this.modal.confirm({
      nzTitle: `Are you sure you want to remove ${data.Fname}?`,
      nzOkText: "Yes",
      nzOkType: "primary",
      nzOkDanger: true,
      nzOnOk: () => {
        console.log("Deleting user with ID:", data._id); // Log the user ID for debugging

        // Make the HTTP request to delete the user
        this.service.deleteUser(data._id).subscribe(
          (response) => {
            console.log("User deleted successfully", response);
            this.toastService.showToast(
              "warning",
              "Student Deleted Successfully!"
            );
            // this.userId = '';  // Reset the user ID field
            this.fetchStudents();
          },
          (error) => {
            console.error("Error deleting user", error);
            const errorMessage = error.message
              ? error.message
              : "An error occurred";
            this.toastService.showToast("error", errorMessage);
          }
        );
      },
      nzCancelText: "No",
      nzOnCancel: () => console.log("Cancel"),
    });
  }

  showModal(student: any): void {
    const {
      _id,
      Fname,
      Lname,
      roll_No,
      email,
      DOB,
      phone,
      role,
      password,
      photo,
    } = student;
    this.selectedStudent = {
      _id,
      Fname,
      Lname,
      roll_No,
      email,
      DOB,
      phone,
      role,
      password,
      photo,
    };
    this.isVisible = true;
  }

  handleOk(): void {
    console.log("Button ok clicked!", this.selectedStudent);
    this.updateStudent(this.selectedStudent);
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log("Button cancel clicked!");
    this.isVisible = false;
  }
  formatTimestamp(isoDate: any): any {
    return this.datePipe.transform(isoDate, "mediumDate");
  }
}
