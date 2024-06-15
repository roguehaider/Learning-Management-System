import { Component, ViewChild } from "@angular/core";
import {
  FormControl,
  FormGroup,
  NgModel,
  NonNullableFormBuilder,
  Validators,
} from "@angular/forms";
import { AuthService } from "src/app/services/auth/auth.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
  passwordVisible = false;
  @ViewChild("emailInput") emailInput: NgModel | undefined; // Declare emailInput as NgModel type

  loginForm!: FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
    rememberMe: FormControl<boolean>;
  }>;
  forgetPass!: FormGroup<{
    email: FormControl<string>;
  }>;
  isVisible = false;
  isOkLoading = false;
  loader: boolean = false;
  constructor(
    private fb: NonNullableFormBuilder,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ["", [Validators.email, Validators.required]],
      password: ["", [Validators.required]],
      rememberMe: [false],
    });
    this.forgetPass = this.fb.group({
      email: ["", [Validators.email, Validators.required]],
    });
  }

  userSignIn() {
    if (this.loginForm.invalid) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please enter a valid email or password!",
        showConfirmButton: false,
        timer: 2500,
      });
      this.loader = false;
      return;
    }
    this.loader = true;
  
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    const isRememberMe = this.loginForm.value.rememberMe;
  
     this.authService.signIn(email!, password!, isRememberMe!).then(()=>{
      this.loader = false;
      this.loginForm.reset();
      
     }).catch((error)=>{
        this.loader = false;
        console.error(error);
     });
  }
  

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.loginForm.reset();
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log(this.forgetPass);
    this.isOkLoading = true;
    this.authService.fireservice
      .getDataWithWhere(
        "Users",
        "email",
        "==",
        this.forgetPass.controls["email"].value
      )
      .then((signInMethods: any) => {
        if (signInMethods.length === 0) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Email Not Exist",
            showConfirmButton: false,
            timer: 2500,
          });
          this.isVisible = false;
          this.isOkLoading = false;
          this.forgetPass.reset();
        } else {
          var actionCodeSettings = {
            url: "https://call-centre-crm.web.app/login",
          };
          this.authService.afAuth
            .sendPasswordResetEmail(
              this.forgetPass.controls["email"].value,
              actionCodeSettings
            )
            .then(() => {
              Swal.fire({
                icon: "success",
                title: "Email Send Successfully",
                showConfirmButton: false,
                timer: 2500,
              });
              this.isVisible = false;
              this.isOkLoading = false;
            })
            .catch((err) => {
              console.log(err);
              this.isVisible = false;
              this.isOkLoading = false;
            });
          this.forgetPass.reset();
        }
      });
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
