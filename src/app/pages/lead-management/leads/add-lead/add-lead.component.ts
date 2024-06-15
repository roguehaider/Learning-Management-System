import { Component } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from "@angular/forms";
import { FirestoreService } from "src/app/services/firestore.service";
import Swal from "sweetalert2";
import { Lead } from "../view-leads.component";
import { Router } from "@angular/router";
import { CanComponentLeave } from "src/app/services/guards/can-leave-guard/can-leave-guard.service";

@Component({
  selector: "app-add-lead",
  templateUrl: "./add-lead.component.html",
  styleUrls: ["./add-lead.component.scss"],
})
export class AddLeadComponent implements CanComponentLeave {
  validateForm!: FormGroup;
  leadsData: Lead[] = [];
  isEditMode: boolean = false;
  editable: boolean = false;
  isLoading: boolean = false;
  leadData: any;
  originalFormValue: any;
  isVisible = false;
  street = "";
  city = "";
  state = "";
  zipcode = "";
  loader: boolean = false;

  constructor(
    private fb: FormBuilder,
    private firestore: FirestoreService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initializeForm();
    const state = history.state;
    this.leadData = state.leadData;
    const editMode = state.editMode;
    if (this.leadData) {
      // if we are editing form
      if (editMode) {
        this.validateForm.enable();
        this.editable = true;
        this.validateForm.patchValue(this.leadData);
      } else {
        // this.validateForm.disable();
        this.validateForm?.setValue(this.leadData);
      }
    }

    this.originalFormValue = this.validateForm.value;
  }

  canLeave(): boolean {
    if (this.validateForm.dirty) {
      return confirm("You have unsaved changes. Do you want to leave?");
    }
    return true;
  }

  /**
   * to initialize lead form
   */
  initializeForm() {
    this.validateForm = this.fb.group({
      first_name: [""],
      last_name: [""],
      business_name: ["", [Validators.required, this.noWhitespaceValidator]],
      business_type: ["", [Validators.required, this.noWhitespaceValidator]],
      full_address: ["", [Validators.required, this.noWhitespaceValidator]],
      address_street: [""],
      address_city: [""],
      address_state: [""],
      address_zipcode: [""],
      phone_number: ["", [Validators.required, this.phoneNumberValidator]],
      email: ["", [Validators.email]],
      second_phone_number: ["", [this.optionalPhoneNumberValidator]],
      comment: [""],
    });
  }

  saveOrUpdateData() {
    this.loader = true;

    if (this.validateForm.valid) {
      // Removes all non-digit characters from phone numbers before sending data to DB
      this.validateForm.controls["phone_number"].setValue(
        this.validateForm.controls["phone_number"].value.replace(/[^\d]/g, "")
      );

      this.validateForm.controls["second_phone_number"].setValue(
        this.validateForm.controls["second_phone_number"]?.value?.replace(
          /[^\d]/g,
          ""
        )
      );

      const fullAddressValue =
      this.validateForm.controls["full_address"].value.toLowerCase().trim();

      //trim each input before saving to the database
      const formData = this.validateForm.value;
      let leadData: any = {};

      for (const key in formData) {
        if (Object.prototype.hasOwnProperty.call(formData, key)) {
          const value = formData[key];
          leadData[key] = typeof value === "string" ? value.trim() : value;
        }
      }

      if (this.editable) {
        const updatingLeadId = this.leadData.docId;

        this.firestore.getById(updatingLeadId, "Leads").then((data: any) => {
            if (data.full_address === fullAddressValue) {
              leadData = {...leadData, full_address: leadData.full_address?.toLowerCase()};
            this.firestore
              .updateDataById(updatingLeadId, "Leads", leadData)
              .then(() => {
                this.loader = false;
                Swal.fire({
                  icon: "success",
                  title: "Data updated successfully",
                  showConfirmButton: false,
                  timer: 1500,
                });
                this.validateForm.reset();
                this.router.navigate(["/lead-management"]);
              })
              .catch(() => {
                this.loader = false;
                Swal.fire("Error", "Failed to update data.", "error");
              });
          } else {
            this.firestore
              .getDataWithWhere("Leads", "full_address", "==", fullAddressValue)
              .then((querySnapshot: any) => {
                if (querySnapshot.length > 0) {
                  this.loader = false;
                  this.validateForm.controls["full_address"].setErrors({
                    duplicated: true,
                  });
                } else {
                  this.firestore
                    .updateDataById(updatingLeadId, "Leads", leadData)
                    .then(() => {
                      this.isLoading = false;
                      this.loader = false;

                      Swal.fire({
                        icon: "success",
                        title: "Data updated successfully",
                        showConfirmButton: false,
                        timer: 1500,
                      });
                      this.validateForm.reset();
                      this.router.navigate(["/lead-management"]);
                    })
                    .catch(() => {
                      this.loader = false;

                      Swal.fire("Error", "Failed to update data.", "error");
                    });
                }
              })
              .catch((error: any) => {
                this.loader = false;

                console.error(
                  "Error checking for existing phone number:",
                  error
                );
              });
          }
        });
      } else {
        this.firestore
        .getDataWithWhere("Leads", "full_address", "==", fullAddressValue)
        .then((querySnapshot: any) => {
          if (querySnapshot.length > 0) {
            this.validateForm.controls["full_address"].setErrors({
              duplicated: true,
            });
            this.loader = false;
          } else {
            leadData = {...leadData, full_address: leadData.full_address.toLowerCase()}
            this.firestore
              .addDatatoDb(leadData, "Leads")
              .then(() => {
                this.isLoading = false;
                this.loader = false;
                Swal.fire({
                  icon: "success",
                  title: "Data saved successfully",
                  showConfirmButton: false,
                  timer: 1500,
                }).then(() => {
                  this.validateForm.reset();
                  this.router.navigate(["/lead-management"]);
                });
              })
              .catch((error) => {
                this.loader = false;

                Swal.fire({
                  icon: "error",
                  title: "Error on saving data",
                  text: `${error}`,
                  showConfirmButton: false,
                  timer: 1500,
                });
                console.error("Error saving document:", error);
              });
          }
        });
      }
    }
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
  }

  phoneNumberValidator(control: FormControl): ValidationErrors | null {
    const phoneNumber: any = control.value;

    // Check if the input contains characters other than digits, '+', '(', ')', and '-'
    if (!/^[\d()+-]*$/.test(phoneNumber)) {
      return { invalidType: true };
    }

    const onlyDigitsPhoneNumber = phoneNumber.replace(/[^\d]/g, ""); // Removes all non-digit characters

    // Check if the phone number length is less than 7
    if (onlyDigitsPhoneNumber.length <= 6) {
      return { minLength: true };
    }

    // Check if the phone number length is greater than 15
    if (onlyDigitsPhoneNumber.length > 15) {
      return { maxLength: true };
    }

    return null;
  }

  optionalPhoneNumberValidator(control: FormControl): ValidationErrors | null {
    const phoneNumber: any = control.value;

    if (phoneNumber?.length) {
      // Check if the input contains characters other than digits, '+', '(', ')', and '-'
      if (!/^[\d()+-]*$/.test(phoneNumber)) {
        return { invalidType: true };
      }

      const onlyDigitsPhoneNumber = phoneNumber.replace(/[^\d]/g, ""); // Removes all non-digit characters

      // Check if the phone number length is less than 7
      if (onlyDigitsPhoneNumber.length <= 6) {
        return { minLength: true };
      }

      // Check if the phone number length is greater than 15
      if (onlyDigitsPhoneNumber.length > 15) {
        return { maxLength: true };
      }
    }
    return null;
  }

  noWhitespaceValidator(control: FormControl): ValidationErrors | null {
    const value: any = control.value;
    if (control.value && /^\s*$/.test(control.value)) {
      return { whitespace: true };
    }
    return null;
  }

  handleModalCancel(): void {
    this.isVisible = false;
  }

  handleModalOk(): void {
    this.isVisible = false;
  }
}
