import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  ValidationErrors,
} from "@angular/forms";
import Swal from "sweetalert2";
import { FirestoreService } from "src/app/services/firestore.service";
import { NzModalService } from "ng-zorro-antd/modal";
import { Desposition } from "../../lead-management/leads/view-leads.component";

@Component({
  selector: "app-disposition",
  templateUrl: "./disposition.component.html",
  styleUrls: ["./disposition.component.scss"],
})
export class DispositionComponent implements OnInit {
  dispositionsData: Desposition[] = [];
  addDisp!: FormGroup;
  createdBy: string | null = null;
  isEditMode: boolean = false;
  DispositionID: any = null;
  isVisible = false;
  isOkLoading = false;
  loader: boolean = true;

  constructor(
    public firestore: FirestoreService,
    private modal: NzModalService,
  ) {}

  ngOnInit() {
    let currentUser = null;
    let currentLocalStorageUser = localStorage.getItem("user");
    let currentSessionUser = sessionStorage.getItem("user");
    if (currentLocalStorageUser) {
      currentUser = JSON.parse(currentLocalStorageUser);
    } else {
      currentUser = JSON.parse(currentSessionUser!);
    }
    if (currentUser) {
      this.createdBy = currentUser.name;
    }
    this.fetchDispositions();
    this.initializeDispositionsForm();
  }

  initializeDispositionsForm(): void {
    this.addDisp = new FormGroup({
      disposition: new FormControl("", [
        Validators.required,
        this.noWhitespaceValidator,
      ]),
      name: new FormControl(this.createdBy),
    });
  }

  fetchDispositions(): void {
    this.firestore.getAllData("Disposition").then((response: any) => {
      this.dispositionsData = response;
      this.loader = false;
      this.dispositionsData.forEach((item) => {
        item.disposition = item.disposition
          .split(" ")
          .map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          )
          .join(" ");
      });
    }).catch((error)=>{
      this.loader = false;
      console.error('Error:', error);
    });
  }

  handleOk(): void {
    this.isOkLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 3000);
  }

  handleCancel(): void {
    this.isVisible = false;
    this.isEditMode = false;
  }

  showModal(): void {
    this.isVisible = true;
    this.initializeDispositionsForm();
  }

  SaveOrUpdateDisposition(): void {
    if (this.addDisp.valid) {
      const dispositionData = this.addDisp.value;
      const dispositionValue = this.addDisp.controls["disposition"].value
        .toLowerCase()
        .trim();

      if (this.isEditMode) {
        this.firestore
          .getById(this.DispositionID, "Disposition")
          .then((data: any) => {
            if (data.disposition === dispositionValue) {
              this.addDisp.reset();
              this.isVisible = false;
              this.isEditMode = false;
              this.fetchDispositions();
            } else {
              this.firestore
                .getDataWithWhere(
                  "Disposition",
                  "disposition",
                  "==",
                  dispositionValue
                )
                .then((querySnapshot: any) => {
                  if (querySnapshot.length > 0) {
                    this.addDisp.controls["disposition"].setErrors({
                      dispositionExists: true,
                    });
                  } else {
                    this.firestore
                      .updateDataById(this.DispositionID, "Disposition", {
                        disposition: dispositionData.disposition
                          .toLowerCase()
                          .trim(),
                        name: dispositionData.name,
                      })
                      .then(() => {
                        Swal.fire("Success", "Disposition updated!", "success");
                        this.addDisp.reset();
                        this.isVisible = false;
                        this.isEditMode = false;
                        this.fetchDispositions();
                      })
                      .catch(() => {
                        Swal.fire(
                          "Error",
                          "Failed to update disposition.",
                          "error"
                        );
                      });
                  }
                })
                .catch((error: any) => {
                  console.error(
                    "Error checking for existing disposition:",
                    error
                  );
                });
            }
          });
      } else {
        // Add a new disposition
        this.firestore
          .getDataWithWhere(
            "Disposition",
            "disposition",
            "==",
            dispositionValue
          )
          .then((querySnapshot: any) => {
            if (querySnapshot.length > 0) {
              this.addDisp.controls["disposition"].setErrors({
                dispositionExists: true,
              });
            } else {
              this.firestore
                .addDatatoDb(
                  {
                    disposition: dispositionData.disposition
                      .toLowerCase()
                      .trim(),
                    name: dispositionData.name,
                  },
                  "Disposition"
                )
                .then(() => {
                  Swal.fire("Success", "Disposition added!", "success");
                  this.addDisp.reset();
                  this.isVisible = false;
                  this.fetchDispositions();
                })
                .catch(() => {
                  Swal.fire("Error", "Failed to add disposition.", "error");
                });
            }
          })
          .catch((error: any) => {
            console.error("Error checking for existing disposition:", error);
          });
      }
    }
  }

  deleteDisposition(deleteByID: string): void {
    this.firestore.delete("Disposition", deleteByID)
    .then(() => {
      this.fetchDispositions();
    });
  }

  showConfirm(): void {
    this.modal.confirm({
      nzTitle: "<i>Do you Want to delete these items?</i>",
      nzContent: "<b>Some descriptions</b>",
      nzOnOk: () => console.log("OK"),
    });
  }

  showDeleteConfirm(dispositionID: string): void {
    this.modal.confirm({
      nzTitle: "Are you sure delete this Disposition?",
      nzContent: '<b style="color: red;">This Disposition will be Removed!</b>',
      nzOkText: "Yes",
      nzOkType: "primary",
      nzOkDanger: true,
      nzOnOk: () => this.deleteDisposition(dispositionID),
      nzCancelText: "No",
      nzOnCancel: () => console.log("Cancel"),
    });
  }


  handleEditClick(dispositionID: string): void {
    // Find the disposition to edit
    const dispositionToEdit = this.dispositionsData.find(
      (disposition) => disposition.docId === dispositionID
    );

    // Set isEditMode based on whether the disposition was found
    this.isEditMode = dispositionToEdit !== undefined;

    this.isVisible = true;

    // Patch the selected disposition to the form group
    if (dispositionToEdit) {
      this.DispositionID = dispositionToEdit.docId;
      this.addDisp.patchValue({
        disposition: dispositionToEdit.disposition,
        name: dispositionToEdit.name,
      });
    }
  }

  noWhitespaceValidator(control: FormControl): ValidationErrors | null {
    const value: any = control.value;
    if (control.value && /^\s*$/.test(control.value)) {
      return { whitespace: true };
    }
    return null;
  }

}
