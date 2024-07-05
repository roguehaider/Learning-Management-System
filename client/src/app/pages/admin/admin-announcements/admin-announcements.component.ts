import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { NzModalService } from "ng-zorro-antd/modal";
import { Service } from "src/app/services/service";
import { ToastService } from "src/app/utils/toast.service";
export interface Announcements {
  id: string;
  title: string;
  description: string;
  createdAt: string;
}

@Component({
  selector: "app-admin-announcements",
  templateUrl: "./admin-announcements.component.html",
  styleUrls: ["./admin-announcements.component.scss"],
})
export class AdminAnnouncementsComponent {
  isVisible = false;
  announcements: Announcements[] = [];
  newAnnouncement: Partial<Announcements> = {
    title: "",
    description: "",
  };
  loading = false;

  constructor(
    private router: Router,
    private toastService: ToastService,
    private modal: NzModalService,
    private service: Service
  ) {}
  ngOnInit(): void {
    this.fetchAnnouncements();
  }
  fetchAnnouncements(): void {
    this.service.getAnnouncements().subscribe(
      (response) => {
        console.log(response);
        this.announcements = response.announcements;
        console.log(this.announcements, response);
      },
      (error) => {
        console.error("Error fetching classes:", error);
      }
    );
  }

  createAnnouncement(): void {
    this.service.createAnnouncement(this.newAnnouncement).subscribe(
      (response) => {
        console.log("Announcement created successfully:", response);
        this.toastService.showToast("success", "Announcement Created!");
        this.isVisible = false;
        this.fetchAnnouncements();
        // this.resetForm();
      },
      (error) => {
        console.error("Error creating announcement:", error);
        const errorMessage = error.message
          ? error.message
          : "An error occurred";
        this.toastService.showToast("error", errorMessage);
      }
    );
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleCancel(): void {
    this.isVisible = false;
    // this.resetForm();
  }
  handleOk(): void {
    console.log("Button ok clicked!");
    this.createAnnouncement();
    this.isVisible = false;
  }

  trackByFn(index: number, item: any): any {
    return item.id; // or any unique identifier for the item
  }
}
