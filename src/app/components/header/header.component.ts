import { Component } from "@angular/core";
import { FormBuilder, FormGroup, NonNullableFormBuilder, Validators } from "@angular/forms";
import { AuthService } from "src/app/services/auth/auth.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {
  currentUser: any;
  isVisible: boolean = false;
  changePasswordForm!: FormGroup;

  constructor(private authService: AuthService, private fb: FormBuilder) {}

  ngOnInit() {
    let currentUser = null;
    let currentLocalStorageUser = localStorage.getItem("user");
    let currentSessionUser = sessionStorage.getItem("user");
    if (currentLocalStorageUser) {
      currentUser = JSON.parse(currentLocalStorageUser!);
    } else {
      currentUser = JSON.parse(currentSessionUser!);
    }
    if (currentUser) {
      this.currentUser = currentUser;
    }
    this.initializeForm();
  }

  initializeForm(): void {
    this.changePasswordForm = this.fb.group({
      userId: [""],
      email: ["", [Validators.email, Validators.required]],
      current_password: ["", [Validators.required]],
      new_password: ["", [Validators.required]],
      confirm_password: ["", [Validators.required]],
    });
  }

  userLogout(): void {
    this.authService.signOut();
  }

  handleChangePasswordClick(): void {
    this.isVisible = true;
    this.initializeForm();
  }

  submitForm(): void {}

  handleCancel(): void {
    this.isVisible = false;
  }

  handleOk() : void {
  }

}
