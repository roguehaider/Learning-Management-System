import { Component } from "@angular/core";
import { AuthService } from "../services/auth/auth.service";
import { Router } from "@angular/router";
import { ToastService } from "../utils/toast.service";

@Component({
  selector: "app-layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.scss"],
})
export class LayoutComponent {
  isCollapsed = false;
  photo: string | null = null;

  userName = this.authService.getUserName();
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {}

   
  ngOnInit(): void {
    this.photo = localStorage.getItem('photo');
    console.log(this.photo)
  }

  logout() {
    const user = this.authService.getUser();
    this.authService.logout(user).subscribe(
      (response) => {
        console.log("Logged out successfully", response);
        // Redirect to login page or home page after logout
        this.router.navigate(["/login"]);
        this.toastService.showToast("info", "Logout Successfully!");
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
