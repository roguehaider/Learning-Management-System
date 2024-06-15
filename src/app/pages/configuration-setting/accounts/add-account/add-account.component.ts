import { Component } from "@angular/core";
import {
  AbstractControl,
  AsyncValidatorFn,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ValidationErrors,
  Validators,
} from "@angular/forms";
import { Observable, Observer } from "rxjs";
import Swal from "sweetalert2";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { FirestoreService } from "src/app/services/firestore.service";
import { Router } from "@angular/router";
@Component({
  selector: "app-add-account",
  templateUrl: "./add-account.component.html",
  styleUrls: ["./add-account.component.scss"],
})
export class AddAccountComponent {
  validateForm!: FormGroup<{
    name: FormControl<string>;
    email: FormControl<string>;
    password: FormControl<string>;
    role: FormControl<string>;
    is_active: FormControl<boolean>;
  }>;
  editable: boolean = false;
  accountData: any;
  loader: boolean = false;
  constructor(
    private fb: NonNullableFormBuilder,
    private firestore: FirestoreService,
    public afAuth: AngularFireAuth,
    private router: Router
  ) {
    this.validateForm = this.fb.group({
      name: ["", [Validators.required, this.noWhitespaceValidator]],
      email: ["", [Validators.email, Validators.required]],
      password: ["", [Validators.required]],
      is_active: [true],
      role: ["", [Validators.required]],
    });

    const state = history.state;
    this.accountData = state.accountData;
    const editMode = state.editMode;
    if (this.accountData) {
      // if we are editing form
      if (editMode) {
        this.validateForm.enable();
        this.editable = true;
        this.validateForm.patchValue(this.accountData);
        // this.formControlValidator();
      } else {
        // this.validateForm.disable();
        this.validateForm?.setValue(this.accountData);
      }
    }
  }

  submitForm(): void {
    this.loader = true;
    if (this.editable == false) {
      this.afAuth
        .createUserWithEmailAndPassword(
          `${this.validateForm.value.email}`,
          `${this.validateForm.value.password}`
        )
        .then(() => {
          this.validateForm.value.email =
            this.validateForm.value.email?.toLowerCase();
          this.firestore
            .addDatatoDb(this.validateForm.value, "Users")
            .then(() => {
              this.loader = false;
              Swal.fire({
                position: "center",
                title: "Account Created!",
                icon: "success",
                showConfirmButton: false,
                timer: 1500,
                width: "26em",
              }).then(() => {
                this.validateForm.reset();
                this.router.navigate(["/settings/account"]);
              }).catch((error)=>{
              this.loader = false;
                console.error(error);
              }
              );
            });
        })
        .catch((err) => {
          console.log(err);
          this.loader = false;

          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Email Already exist",
            showConfirmButton: false,
            timer: 2500,
          });
        });
    } else {
      this.firestore
        .updateDataById(
          this.accountData.docId,
          "Users",
          this.validateForm.value
        )
        .then(() => {
          this.loader = false;
          Swal.fire({
            position: "center",
            title: "Account Updated!",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
            width: "26em",
          }).then(() => {
            this.validateForm.reset();
            this.router.navigate(["/settings/account"]);
          });
        }).catch((error)=>{
          this.loader = false;
          console.log(error);
        });
    }
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
  }

  emailAsyncValidator: AsyncValidatorFn = (control: AbstractControl) =>
    new Observable((observer: Observer<ValidationErrors | null>) => {
      this.firestore
        .getDataWithWhere("Users", "email", "==", control.value)
        .then((response: any) => {
          let index = response.findIndex(
            (val: any) => val.email === control.value
          );
          if (index != -1) {
            observer.next({ error: true, duplicated: true });
          } else {
            observer.next(null);
          }
          observer.complete();
        });
    });

  noWhitespaceValidator(control: FormControl): ValidationErrors | null {
    const value: any = control.value;
    if (control.value && /^\s*$/.test(control.value)) {
      return { whitespace: true };
    }
    return null;
  }
}
