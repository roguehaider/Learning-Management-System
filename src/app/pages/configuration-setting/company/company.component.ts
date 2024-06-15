import { Component } from "@angular/core";
import Swal from "sweetalert2";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { FirestoreService } from "src/app/services/firestore.service";
import { NzModalService } from "ng-zorro-antd/modal";

@Component({
  selector: "app-company",
  templateUrl: "./company.component.html",
  styleUrls: ["./company.component.scss"],
})
export class CompanyComponent {
  currentUser: any;
  addComp = new FormGroup({
    company_name: new FormControl("", [Validators.required]),
    created_by: new FormControl("", [Validators.required]),
  });
  data: any = [];
  compEdit!: FormGroup;
  loader: boolean = true;

  constructor(
    public firestore: FirestoreService,
    private modal: NzModalService,
    private fb: FormBuilder
  ) {
    this.getCompanyData();
  }

  getCompanyData() {
    this.firestore.getAllData("Company").then((response: any) => {
      this.data = response;
      this.loader = false;
    }).catch((error)=>{
      this.loader = false;
      console.error('Error:', error)
    });
  }

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

    this.compEdit = this.fb.group({
      company_name: ["", Validators.required],
      created_by: [""],
      // Add other form controls as needed
    });
  }

  companyData: any = {
    company: "",
    created_by: "",
  };

  isSubmitting: boolean = false;

  isVisible = false;
  isUpdateVisible = false;
  isOkLoading = false;

  handleOk(): void {
    this.isOkLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 3000);
  }

  handleCancel(): void {
    this.isVisible = false;
    this.isUpdateVisible = false;
  }

  disp(): void {
    this.isVisible = true;
  }

  saveCompany() {
    this.addComp.value.created_by = this.currentUser.name;

    this.isSubmitting = true;
    this.firestore
      .addDatatoDb(this.addComp.value, "Company")
      .then(() => {
        Swal.fire("Success", "Message sent Successfully!", "success");
        this.data.push(this.addComp.value);
        this.isVisible = false;
      })
      .catch(() => {
        Swal.fire("Error", "Failed to send message.", "error");
      })
      .finally(() => {
        this.isSubmitting = false;
      });
  }

  delete(deleteByID: string): void {
    this.firestore.delete("Company", deleteByID);
    this.getCompanyData();
  }

  showConfirm(): void {
    this.modal.confirm({
      nzTitle: "<i>Do you Want to delete these items?</i>",
      nzContent: "<b>Some descriptions</b>",
      nzOnOk: () => console.log("OK"),
    });
  }

  showDeleteConfirm(compId: string): void {
    this.modal.confirm({
      nzTitle: "Are you sure delete this Company?",
      nzContent:
        '<b style="color: red;">This Company data will be Removed!</b>',
      nzOkText: "Yes",
      nzOkType: "primary",
      nzOkDanger: true,
      nzOnOk: () => this.delete(compId),
      nzCancelText: "No",
      nzOnCancel: () => console.log("Cancel"),
    });
  }
  selectedCompany: any; // Add this property
  updateModal(company: any): void {
    this.isUpdateVisible = true;
    this.compEdit.patchValue(company);

    this.selectedCompany = { ...company }; // Make a copy to avoid unintentional modifications
  }
  updateCompany(): void {

    const compId = this.selectedCompany.docId;
    this.firestore
      .updateDataById(compId, "Company", this.compEdit.value)
      .then(() => {
        // this.isLoading = false;
        Swal.fire({
          icon: "success",
          title: "Data updated successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        this.isUpdateVisible = false;
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error on updating data",
          showConfirmButton: false,
          timer: 1500,
        });
        console.error("Error updating document:", error);
      });
  }
}
