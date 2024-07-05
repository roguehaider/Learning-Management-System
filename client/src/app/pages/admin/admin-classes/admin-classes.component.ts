import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { NzModalService } from "ng-zorro-antd/modal";
import { Service } from "src/app/services/service";
import { ToastService } from "src/app/utils/toast.service";
export interface Classes {
  _id: string;
  name: string;
}
@Component({
  selector: "app-admin-classes",
  templateUrl: "./admin-classes.component.html",
  styleUrls: ["./admin-classes.component.scss"],
})
export class AdminClassesComponent {
  isVisible = false;

  classes: Classes[] = [];
  newClass: Partial<Classes> = {
    name: "",
  };

  constructor(
    private router: Router,
    private toastService: ToastService,
    private modal: NzModalService,
    private service: Service
  ) {}
  ngOnInit(): void {
    this.fetchClasses();
  }
  fetchClasses(): void {
    this.service.getClasses().subscribe(
      (response) => {
        console.log(response);
        this.classes = response.classes;
        console.log(this.classes);
      },
      (error) => {
        console.error("Error fetching classes:", error);
        // Handle error, show error message, etc.
      }
    );
  }
  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log("Button ok clicked!");

    this.service.createClass(this.newClass).subscribe(
      (response) => {
        console.log("Class created successfully:", response);
        this.isVisible = false;
        this.toastService.showToast("success", "Class Added Successfully!");
        this.fetchClasses();
        this.newClass = { name: "" };
      },

      (error) => {
        console.error("Error creating class:", error);
        const errorMessage = error.message
          ? error.message
          : "An error occurred";
        this.toastService.showToast("error", errorMessage);
      }
    );

    this.isVisible = false;
  }

  handleCancel(): void {
    console.log("Button cancel clicked!");
    this.isVisible = false;
  }

  navigateToClassDetail(classDetail: Classes): void {
    const className = encodeURIComponent(classDetail.name);
    const classId = classDetail._id;
    this.router.navigate([`/admin/class-detail/${className}`], {
      queryParams: { id: classId },
    });
  }
  showDeleteConfirm(event: Event,classData: any): void {
    event.stopPropagation();
    this.modal.confirm({
      nzTitle: `Are you sure delete ${classData.name}?`,
      nzOkText: "Yes",
      nzOkType: "primary",
      nzOkDanger: true,
      nzOnOk: () => {
        console.log("Deleting user with ID:", classData._id);

        this.service.deleteClass(classData._id).subscribe(
          (response) => {
            console.log("User deleted successfully", response);
            this.toastService.showToast(
              "warning",
              "Class Deleted Successfully!"
            );
            this.fetchClasses();
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
}
