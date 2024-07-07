import { Component } from "@angular/core";
import { AuthService } from "../services/auth/auth.service";
import { Router } from "@angular/router";
import { ToastService } from "../utils/toast.service";

@Component({
  selector: "app-layout-teacher",
  templateUrl: "./layout-teacher.component.html",
  styleUrls: ["./layout-teacher.component.scss"],
})
export class LayoutTeacherComponent {
  isCollapsed = false;
  userName = this.authService.getUserName();
  user = this.authService.getUserDetails();

  constructor(
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router
  ) {}

  logout() {
    const user = this.authService.getUser();
    this.authService.logout(user).subscribe(
      (response) => {
        console.log("Logged out successfully", response);
        this.router.navigate(["/login"]);
        this.toastService.showToast("info", "Teacher Logout Successfully!");
      },
      (error) => {
        console.error("Error during logout", error, user);
        const errorMessage = error.message
          ? error.message
          : "An error occurred";
        this.toastService.showToast("error", errorMessage);
      }
    );
  }
}
