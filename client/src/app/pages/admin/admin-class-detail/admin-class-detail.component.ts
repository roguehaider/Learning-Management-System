import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Service } from "src/app/services/service";
import { Teachers } from "../admin-teacher/admin-teacher.component";
import { DatePipe } from "@angular/common";
import { NzModalService } from "ng-zorro-antd/modal";
import { ToastService } from "src/app/utils/toast.service";

@Component({
  selector: "app-admin-class-detail",
  templateUrl: "./admin-class-detail.component.html",
  styleUrls: ["./admin-class-detail.component.scss"],
  providers: [DatePipe],
})
export class AdminClassDetailComponent {
  isVisible = false;
  isAddingCourses = false;
  isAddTeacherVisible = false;
  isAddCourseVisible = false;

  classId!: string;
  classDetail: any;
  className!: string;

  assignedTeacherId!: string;
  assignedTeacherName: string | null = null;
  listOfTeachers: any[] = [];

  totalCourses!: string;
  courseDetails: any[] = [];

  totalStudents!: string;
  studentsId: any[] = [];
  studentDetails: any[] = [];
  listOfStudents: any[] = [];
  listOfSelectedStudents: any[] = [];

  coursesId: any[] = [];
  selectedCourses: any[] = [];
  listOfCourses: any[] = [];

  selectedTeacher: any;
  teachers: Partial<Teachers> = {
    _id: "",
    Fname: "",
    Lname: "",
    email: "",
    phone: "",
    DOB: "",
  };

  constructor(
    private route: ActivatedRoute,
    private toastService: ToastService,
    private service: Service,
    private datePipe: DatePipe,
    private modal: NzModalService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.className = params["name"];
    });

    this.route.queryParams.subscribe((params) => {
      this.classId = params["id"];
      this.fetchClassDetail();
      this.fetchStudents();
      this.fetchCourses();
      this.fetchTeachers();
    });
  }

  fetchClassDetail(): void {
    this.service.getClassById(this.classId).subscribe(
      (response) => {
        console.log("det", response);
        this.classDetail = response.class;
        if (response.class.teacher_id) {
          this.assignedTeacherId = response.class.teacher_id;
        } else {
          this.assignedTeacherName = null; // No teacher assigned
        }
        if (response.class.totalStudents) {
          this.totalStudents = response.class.students.length;
        }
        if (response.class.courses) {
          this.totalCourses = response.class.courses.length;
          this.coursesId = response.class.courses;
          this.fetchCoursesById(response.class.courses); // Fetch course details
        }
      },
      (error) => {
        console.error("Error fetching class detail:", error);
      }
    );
  }
  fetchTeachers(): void {
    this.service.getTeacher().subscribe(
      (response) => {
        const teachers = response.TeachersDto;
        console.log(response);

        this.listOfTeachers = [];

        teachers.forEach((teacher: { _id: string; Fname: any; Lname: any }) => {
          if (teacher._id === this.assignedTeacherId) {
            console.log("Match found");
            this.assignedTeacherName = `${teacher.Fname} ${teacher.Lname}`;
          } else {
            this.listOfTeachers.push(teacher);
          }
        });
      },
      (error) => {
        console.error("Error fetching teachers:", error);
      }
    );
  }

  fetchCourses(): void {
    this.service.getCourses().subscribe(
      (response) => {
        const courses = response.courses;
        console.log("coursess", response, this.coursesId);

        // Initialize listOfCourses to an empty array to avoid duplicates
        this.listOfCourses = [];

        courses.forEach((course: any) => {
          let isCourseInList = false;

          this.coursesId.forEach((id: any) => {
            if (course._id === id) {
              isCourseInList = true;
            }
          });

          if (!isCourseInList) {
            this.listOfCourses.push({ label: course.name, value: course._id });
          }
        });

        console.log("Available courses:", this.listOfCourses);
      },
      (error) => {
        console.error("Error fetching courses:", error);
      }
    );
  }

  addCourseCancel() {
    this.isAddCourseVisible = false;
  }

  fetchStudents(): void {
    this.service.getStudents().subscribe(
      (response) => {
        console.log(response.students);
        const allStudents = response.students;
        this.studentDetails = [];
        this.listOfStudents = [];

        if (this.classDetail.students.length === 0) {
          this.listOfStudents = allStudents;
        } else {
          allStudents.forEach((student: any) => {
            console.log("all", student._id, this.classDetail.students);
            let found = false;
            this.classDetail.students.forEach((classStudentId: any) => {
              if (student._id === classStudentId) {
                this.studentDetails.push(student);
                found = true;
              }
            });

            if (!found) {
              this.listOfStudents.push(student);
            }

            this.studentDetails = Array.from(
              new Set(this.studentDetails.map((s) => JSON.stringify(s)))
            ).map((s) => JSON.parse(s));
            this.listOfStudents = Array.from(
              new Set(this.listOfStudents.map((s) => JSON.stringify(s)))
            ).map((s) => JSON.parse(s));
          });
        }
      },
      (error) => {
        console.error("Error fetching students:", error);
      }
    );
  }

  fetchCoursesById(courseIds: string[]): void {
    this.courseDetails = []; // Reset course details array
    courseIds.forEach((courseId) => {
      this.service.getCourseById(courseId).subscribe(
        (response) => {
          console.log("Fetched course:", response);
          this.courseDetails.push(response.course);
          // this.listOfSelectedValue.push(response.course._id);  // Add to selected values
        },
        (error) => {
          console.error("Error fetching course:", error);
        }
      );
    });
  }

  addCourse() {
    console.log(this.selectedCourses);
    const data = {
      courses: this.selectedCourses,
      class_id: this.classId,
    };
    this.service.addCourseInClass(data).subscribe(
      (response) => {
        console.log("course added successfully:", response);
        this.toastService.showToast("success", "Course Added");
        this.fetchClassDetail();
        this.fetchCourses();
        this.isAddCourseVisible = false;
      },
      (error) => {
        console.error("Error adding course:", error);
        const errorMessage = error.message
          ? error.message
          : "An error occurred";
        this.toastService.showToast("error", errorMessage);
      }
    );
  }
  addCourseModel() {
    this.isAddCourseVisible = true;
  }

  addStudent() {
    if (
      !this.listOfSelectedStudents ||
      this.listOfSelectedStudents.length === 0
    ) {
      console.error("No students selected.");
      this.toastService.showToast("warning", "No students selected.");
      return;
    }

    // Extract student IDs from listOfSelectedStudents
    const studentIds = this.listOfSelectedStudents.map((student) => student);
    console.log("selec", this.listOfSelectedStudents);
    const data = {
      students: studentIds,
      class_id: this.classId,
    };

    this.service.addStudentToClass(data).subscribe(
      (response) => {
        console.log("Students added to class successfully:", response);
        this.toastService.showToast("success", "Student Added");
        this.isVisible = false;
        this.fetchClassDetail();
        this.fetchStudents();
      },
      (error) => {
        console.error("Error adding students to class:", error);
        const errorMessage = error.message
          ? error.message
          : "An error occurred";
        this.toastService.showToast("error", errorMessage);
      }
    );
  }

  addTeacher() {
    const data = {
      teacher_id: this.selectedTeacher,
      class_id: this.classId,
    };

    this.service.addTeacherToClass(data).subscribe(
      (response) => {
        console.log("Teacher added to class successfully:", response);
        this.toastService.showToast("success", "Teacher Added");
        this.isAddTeacherVisible = false;
        this.fetchClassDetail();
        this.fetchTeachers();
      },
      (error) => {
        console.error("Error adding teacher to class:", error);
        const errorMessage = error.message
          ? error.message
          : "An error occurred";
        this.toastService.showToast("error", errorMessage);
      }
    );
  }

  formatTimestamp(isoDate: any): any {
    return this.datePipe.transform(isoDate, "mediumDate");
  }

  showDeleteConfirm(data: any): void {
    this.modal.confirm({
      nzTitle: `Are you sure you want to remove ${data.Fname}?`,
      nzOkText: "Yes",
      nzOkType: "primary",
      nzOkDanger: true,
      nzOnOk: () => {
        console.log("Deleting user with ID:", data._id);

        this.service.deleteStudentFromClass(data._id).subscribe(
          (response) => {
            console.log("User deleted successfully", response);
            this.toastService.showToast(
              "warning",
              "Student Deleted From Class!"
            );
            this.fetchClassDetail();
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

  showClassDeleteConfirm(data: any): void {
    this.modal.confirm({
      nzTitle: `Are you sure you want to remove ${data.name}?`,
      nzOkText: "Yes",
      nzOkType: "primary",
      nzOkDanger: true,
      nzOnOk: () => {
        console.log("Deleting user with ID:", data._id);

        this.service.deleteCourseFromClass(data._id).subscribe(
          (response) => {
            console.log("User deleted successfully", response);
            this.toastService.showToast(
              "warning",
              "Course Deleted From Class!"
            );
            this.fetchClassDetail();
            this.fetchCourses();
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

  //Add Teacher
  showAddTeacher() {
    this.selectedTeacher = null;
    this.isAddTeacherVisible = true;
  }

  AddTeacherCancel() {
    this.isAddTeacherVisible = false;
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log("Button ok clicked!");
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log("Button cancel clicked!");
    this.isVisible = false;
  }

  toggleCourseActions(course: any): void {
    course.showActions = !course.showActions;
  }
}
