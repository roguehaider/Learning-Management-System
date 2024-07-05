import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Service } from "src/app/services/service";
import { Courses } from "../admin-courses/admin-courses.component";
import { DatePipe } from "@angular/common";
import { ToastService } from "src/app/utils/toast.service";
@Component({
  selector: "app-admin-course-detail",
  templateUrl: "./admin-course-detail.component.html",
  styleUrls: ["./admin-course-detail.component.scss"],
  providers: [DatePipe],
})
export class AdminCourseDetailComponent {
  courseId!: string;
  classId!: string;
  courseDetail: any;
  courseName!: string;

  assignedTeacherName: string | undefined;

  assignedClassName: string | undefined;

  assignedTeacherId!: string;
  totalCourses!: string;
  totalStudents!: string;
  studentsId: any[] = [];
  coursesId: any[] = [];
  newCourse: Partial<Courses> = {
    name: "",
    description: "",
    teacher_id: "",
    class_id: "",
  };

  isVisible = false;

  listOfClasses: any[] = [];
  selectedClass: any[] = [];

  listOfTeachers: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private toastService: ToastService,
    private service: Service,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.courseName = params["name"];
    });

    this.route.queryParams.subscribe((params) => {
      this.courseId = params["id"];
      this.fetchCourseDetail();
    });
  }

  fetchCourseDetail(): void {
    this.service.getCourseById(this.courseId).subscribe(
      (response) => {
        console.log(response);
        this.courseDetail = response.course;
        this.classId = this.courseDetail.class_id;
        this.newCourse.name = response.course.name;
        this.newCourse.description = response.course.description;
        this.newCourse.class_id = response.course.class_id;
        this.newCourse.teacher_id = response.course.class_id;
        this.fetchTeachers();
        this.fetchClassById();
        this.fetchClasses();
      },
      (error) => {
        console.error("Error fetching class detail:", error);
      }
    );
  }

  formatTimestamp(isoDate: any): any {
    return this.datePipe.transform(isoDate, "mediumDate");
  }
  showEditModal(): void {
    this.isVisible = true;
  }

  handleEditOk(): void {
    console.log("updated", this.newCourse);
    this.service.updateCourse(this.newCourse, this.courseId).subscribe(
      (response) => {
        console.log("Course Updated successfully:", response);
        this.toastService.showToast("success", "Course Updated Successfully!");
        this.fetchCourseDetail();
        this.isVisible = false;
      },
      (error) => {
        console.error("Error creating course:", error);
        const errorMessage = error.message
          ? error.message
          : "An error occurred";
        this.toastService.showToast("error", errorMessage);
      }
    );

    this.isVisible = false;
    
  }
  fetchTeachers(): void {
    this.service.getTeacher().subscribe(
      (response) => {
        const teachers = response.TeachersDto;
        console.log(response);
        this.listOfTeachers = response.TeachersDto;
        teachers.forEach((teacher: { _id: string; Fname: any; Lname: any }) => {
          if (teacher._id === this.courseDetail.teacher_id) {
            console.log("match");
            this.assignedTeacherName = `${teacher.Fname} ${teacher.Lname}`;
          }
        });
      },
      (error) => {
        console.error("Error fetching teachers:", error);
      }
    );
  }

  fetchClassById(): void {
    console.log("cid", this.classId);
    if (this.classId) {
      this.service.getClassById(this.courseDetail.class_id).subscribe(
        (response) => {
          const classData = response.class;
          this.assignedClassName = classData.name;
          console.log(response, classData);
          this.selectedClass = classData;
          
        },
        (error) => {
          console.error("Error fetching teachers:", error);
        }
      );
    } else {
      console.log("no cid");
    }
  }
  handleEditCancel(): void {
    console.log("Button cancel clicked!");
    this.isVisible = false;
  }
  fetchClasses(): void {
    this.service.getClasses().subscribe(
      (response) => {
        const classes = response;
        console.log("coursess", response, this.classId);

        this.listOfClasses = response.classes;

        console.log("Available courses:", this.listOfClasses);
      },
      (error) => {
        console.error("Error fetching courses:", error);
      }
    );
  }
}
