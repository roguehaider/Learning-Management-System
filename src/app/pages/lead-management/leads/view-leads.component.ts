import { Component } from "@angular/core";
import { FirestoreService } from "src/app/services/firestore.service";
import { NzModalService } from "ng-zorro-antd/modal";
import Swal from "sweetalert2";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { sales } from "../../sales/sales-made/sales-made.component";

export interface Desposition {
  disposition: string;
  name: string;
  docId: string;
}
export interface Lead {
  docId: string;
  first_name: string;
  last_name: string;
  business_name: string;
  business_type: string;
  full_address: string;
  address_street: string;
  address_city: string;
  address_state: string;
  address_zipcode: string;
  phone_number: string;
  email: string;
  second_phone_number: string;
  comment: string;
  created_at: string;
  date: string;
  signed_date: string;
  created_by: string;
  company_name: string;
  installation_date: string;
  sales_status: string;
}

@Component({
  selector: "app-view-leads",
  templateUrl: "./view-leads.component.html",
  styleUrls: ["./view-leads.component.scss"],
})
export class ViewLeadsComponent {
  leadsData: Lead[] = [];
  sales: sales[] = [];
  despositionData: Desposition[] = [];
  nameFilter = null;
  businessNameFilter = null;
  businessTypeFilter = null;
  cityFilter = null;
  stateFilter = null;
  emailFilter = null;
  phoneNumberFilter = null;
  filteredLeadsData: Lead[] = [];
  nameOptions: string[] = [];
  businessNameOptions: string[] = [];
  businessTypeOptions: string[] = [];
  cityOptions: string[] = [];
  stateOptions: string[] = [];
  emailOptions: string[] = [];
  phoneNumberOptions: string[] = [];
  file: File;
  inBulkLeadsData: any[];
  isVisible: boolean = false;
  isCallDialogOpen: boolean = false;
  isOkLoading: boolean = false;
  callLogForm!: FormGroup;
  currentUser: any;
  dateDisable: boolean = true;
  loader: boolean = true;



  constructor(
    private firestore: FirestoreService,
    private modal: NzModalService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
  ) {
    this.fetchLeadsData();
    console.log("leads", this.leadsData)
    this.file = new File([], "");
    this.inBulkLeadsData = [];
    this.callLogForm = this.fb.group({
      'call_duration': [null, Validators.required],
      'desposition': [null, Validators.required],
      'comment': [null],
      'lead_id': [null],
      'created_by': [null],
      'date': [null],
      'call_back_date': [null],
    });
  }

  predateDisable = (current: Date): boolean => {
    return current < new Date();
  };

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
      this.currentUser = currentUser
    }
  }

  private readFile(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        resolve(e.target.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsText(file);
    });
  }

  private resetFile() {
    // Create a new empty File object
    this.file = new File([], "");
  }

  private async parseCSVAndUpload(file: File) {
    let addedRowCount = 0;
    let duplicateAddressesCount = 0;
    let missingRequiredFieldCount = 0;
    try {
      const csvData = await this.readFile(file);


      if (!csvData.trim()) {
        this.isOkLoading = false;
        const Toast = Swal.mixin({
          toast: true,
          position: "bottom-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "error",
          title: `Error! The CSV file is empty.`,
        });

        return;
      }

      // Parse CSV file data
      const rows = csvData.split("\n");
      const headers = rows[0].split(",");

      // Check if the headers match the expected column names from the .csv file
      const expectedColumns = [
        "First Name",
        "Last Name",
        "Business Name",
        "Business Type",
        "Full Address",
        "Address Street",
        "City",
        "State",
        "Zip Code",
        "Phone Number",
        "Email",
        "Second Phone Number",
        "Comment",
      ];

      const missingColumns = expectedColumns.filter(
        (column) => !headers.includes(column)
      );

      if (missingColumns.length > 0) {
        console.error(
          "Error: The CSV file is missing the following columns:",
          missingColumns.join(", ")
        );
        return;
      }

      const dataIndex = {
        first_name: -1,
        last_name: -1,
        business_name: -1,
        business_type: -1,
        full_address: -1,
        address_street: -1,
        address_city: -1,
        address_state: -1,
        address_zipcode: -1,
        phone_number: -1,
        email: -1,
        second_phone_number: -1,
        comment: -1,
      };

      // Map the expected column names to their indexes in the headers array
      headers.forEach((header, index) => {
        switch (header.trim()) {
          case "First Name":
            dataIndex.first_name = index;
            break;
          case "Last Name":
            dataIndex.last_name = index;
            break;
          case "Business Name":
            dataIndex.business_name = index;
            break;
          case "Business Type":
            dataIndex.business_type = index;
            break;
          case "Full Address":
            dataIndex.full_address = index;
            break;
          case "Address Street":
            dataIndex.address_street = index;
            break;
          case "City":
            dataIndex.address_city = index;
            break;
          case "State":
            dataIndex.address_state = index;
            break;
          case "Zip Code":
            dataIndex.address_zipcode = index;
            break;
          case "Phone Number":
            dataIndex.phone_number = index;
            break;
          case "Email":
            dataIndex.email = index;
            break;
          case "Second Phone Number":
            dataIndex.second_phone_number = index;
            break;
          case "Comment":
            dataIndex.comment = index;
            break;
          default:
            break;
        }
      });

      // Start from index 1 to skip the header row & (row.length - 1) will avoid the last empty row each time
      for (let i = 1; i < rows.length - 1; i++) {
        const values = rows[i].split(",");

        // Ensure the correct number of columns in each row
        if (values.length !== headers.length) {
          console.error(
            `Error: Row ${i + 1} has an incorrect number of columns.`
          );
          continue;
        }

        // Validate required fields
        const businessName = values[dataIndex.business_name].trim();
        const businessType = values[dataIndex.business_type].trim();
        const phoneNumber = this.extractNumbers(values[dataIndex.phone_number].trim());
        const secondPhoneNumber = this.extractNumbers(values[dataIndex.phone_number].trim());
        const fullAddress = values[dataIndex.full_address].toLowerCase().trim();

        if (!businessName || !businessType || (!phoneNumber || phoneNumber.length < 6 || phoneNumber.length > 15) || (secondPhoneNumber.length < 6 || secondPhoneNumber.length > 15) || !fullAddress) {
          console.error(
            `Error: Row ${i + 1
            } is missing required fields: Business Name, Business Type, Phone Number, and Full Address.`
          );
          missingRequiredFieldCount++;
          continue;
        } else {
          // Check if the fulladdress already exists in Database
          const fullAddressAlreadyExists =
            await this.firestore.checkWhetherFullAddressAlreadyExists(fullAddress);
          if (fullAddressAlreadyExists) {
            console.error(
              `Warning: Row ${i + 1
              } contains a full address  that already exists in the database: ${fullAddress}`
            );
            duplicateAddressesCount++;
            continue;
          }

          const data = {
            first_name:
              dataIndex.first_name !== -1 ? values[dataIndex.first_name].trim() : "",
            last_name:
              dataIndex.last_name !== -1 ? values[dataIndex.last_name].trim() : "",
            business_name:
              dataIndex.business_name !== -1
                ? values[dataIndex.business_name].trim()
                : "",
            business_type:
              dataIndex.business_type !== -1
                ? values[dataIndex.business_type].trim()
                : "",
            full_address:
              dataIndex.full_address !== -1
                ? values[dataIndex.full_address].toLowerCase().trim()
                : "",
            address_street:
              dataIndex.address_street !== -1
                ? values[dataIndex.address_street].trim()
                : "",
            address_city:
              dataIndex.address_city !== -1
                ? values[dataIndex.address_city].trim()
                : "",
            address_state:
              dataIndex.address_state !== -1
                ? values[dataIndex.address_state].trim()
                : "",
            address_zipcode:
              dataIndex.address_zipcode !== -1
                ? values[dataIndex.address_zipcode].trim()
                : "",
            phone_number:
              dataIndex.phone_number !== -1
                ? this.extractNumbers(values[dataIndex.phone_number].trim())
                : "",
            email: dataIndex.email !== -1 ? values[dataIndex.email].trim() : "",
            second_phone_number:
              dataIndex.second_phone_number !== -1
                ? this.extractNumbers(values[dataIndex.second_phone_number].trim())
                : "",
            comment: dataIndex.comment !== -1 ? values[dataIndex.comment].trim() : "",
          };

          this.inBulkLeadsData.push(data);
          addedRowCount++;
        }
      }
      this.uploadInbulkData(
        this.inBulkLeadsData,
        addedRowCount,
        duplicateAddressesCount,
        missingRequiredFieldCount
      );
    } catch (error) {
      console.error("Error reading file:", error);
      Swal.fire({
        position: "bottom-end",
        title: "Error reading file!",
        icon: "error",
        showConfirmButton: false,
        timer: 2500,
        width: "26em",
      });
    }
  }

  onFileChange(event: any) {
    this.file = event.target.files[0];
  }

  fetchLeadsData(): void {
    this.firestore.getAllData("Leads").then((response: any) => {
      this.leadsData = response;
      this.loader = false;

      if (this.leadsData?.length) {
        this.filteredLeadsData = this.leadsData;
        this.nameOptions = Array.from(
          new Set(
            this.leadsData.map((lead) => lead.first_name + " " + lead.last_name)
          )
        );
        this.businessNameOptions = Array.from(
          new Set(this.leadsData.map((lead) => lead.business_name))
        );
        this.businessTypeOptions = Array.from(
          new Set(this.leadsData.map((lead) => lead.business_type))
        );
        this.cityOptions = Array.from(
          new Set(this.leadsData.map((lead) => lead.address_city))
        );
        this.stateOptions = Array.from(
          new Set(this.leadsData.map((lead) => lead.address_state))
        );
        this.emailOptions = Array.from(
          new Set(this.leadsData.map((lead) => lead.email))
        );
        this.phoneNumberOptions = Array.from(
          new Set(this.leadsData.map((lead) => lead.phone_number))
        );
      }
    }).catch((error) => {
      this.loader = false;
      console.error("Error:", error);
    });
  }

  filterData() {
    if (
      this.nameFilter ||
      this.businessNameFilter ||
      this.businessTypeFilter ||
      this.cityFilter ||
      this.stateFilter ||
      this.emailFilter ||
      this.phoneNumberFilter
    ) {
      this.filteredLeadsData = this.leadsData
        .filter((lead) => {
          return (
            !this.nameFilter ||
            lead.first_name + " " + lead.last_name === this.nameFilter
          );
        })
        .filter((lead) => {
          return (
            !this.businessNameFilter ||
            lead.business_name === this.businessNameFilter
          );
        })
        .filter((lead) => {
          return (
            !this.businessTypeFilter ||
            lead.business_type === this.businessTypeFilter
          );
        })
        .filter((lead) => {
          return !this.cityFilter || lead.address_city === this.cityFilter;
        })
        .filter((lead) => {
          return !this.stateFilter || lead.address_state === this.stateFilter;
        })
        .filter((lead) => {
          return !this.emailFilter || lead.email === this.emailFilter;
        })
        .filter((lead) => {
          return (
            !this.phoneNumberFilter ||
            lead.phone_number === this.phoneNumberFilter
          );
        });
    } else {
      this.filteredLeadsData = this.leadsData;
    }
  }

  clearFilteredSelection() {
    this.businessNameFilter = null;
    this.businessTypeFilter = null;
    this.cityFilter = null;
    this.stateFilter = null;
    this.emailFilter = null;
    this.phoneNumberFilter = null;

    this.filteredLeadsData = this.leadsData;
  }

  deleteLead(deleteByID: string): void {
    this.loader = true;
    this.firestore.delete("Leads", deleteByID)
      .then(() => {
        this.fetchLeadsData();
        this.loader = false;
      })
  }

  showConfirm(): void {
    this.modal.confirm({
      nzTitle: "<i>Do you Want to delete these items?</i>",
      nzContent: "<b>Some descriptions</b>",
      nzOnOk: () => console.log("OK"),
    });
  }
  showDeleteConfirm(leadID: string): void {
    this.modal.confirm({
      nzTitle: "Are you sure delete this Lead?",
      nzContent: '<b style="color: red;">This Lead data will be Removed!</b>',
      nzOkText: "Yes",
      nzOkType: "primary",
      nzOkDanger: true,
      nzOnOk: () => this.deleteLead(leadID),
      nzCancelText: "No",
      nzOnCancel: () => console.log("Cancel"),
    });
  }

  async uploadInbulkData(
    inbulkLeadsData: {
      first_name: string;
      last_name: string;
      business_name: string;
      business_type: string;
      full_address: string;
      address_street: string;
      address_city: string;
      address_state: string;
      address_zipcode: string;
      phone_number: string;
      email: string;
      second_phone_number: string;
      comment: string;
    }[],
    addedRowCount: number,
    duplicateAddressesCount: number,
    missingRequiredFieldCount: number
  ) {
    if (this.file.name) {
      const uniqueLeads = inbulkLeadsData.filter(
        (lead, index, self) =>
          self.findIndex((t) => t.full_address.toLowerCase() === lead.full_address.toLowerCase()) === index
      );
      if (uniqueLeads.length) {
        const uniqueAddedRows = uniqueLeads.length;
        try {
          uniqueLeads.forEach((data) => {
            this.firestore
              .addDatatoDb(data, "Leads")
              .then(() => {
                this.isVisible = false;
                this.isOkLoading = false;
                Swal.fire({
                  position: "center",
                  title: "Inbulk Leads added!",
                  html: `<b>${uniqueAddedRows} row(s) added! </b><br><b>${duplicateAddressesCount} duplicate address(es) found! </b><br><b>${missingRequiredFieldCount} rows has missing required field(s)!</b>`,
                  icon: "success",
                  showConfirmButton: true,
                  width: "26em",
                });
              })
              .catch((error) => {
                this.isVisible = false;
                this.isOkLoading = false;
                console.error("Error uploading data:", error);
                const Toast = Swal.mixin({
                  toast: true,
                  position: "bottom-end",
                  showConfirmButton: false,
                  timer: 3000,
                  timerProgressBar: true,
                  didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                  },
                });
                Toast.fire({
                  icon: "error",
                  title: `Error: ${error}`,
                });
              });
          });
          this.inBulkLeadsData = [];
          this.fetchLeadsData();
          this.resetFile();
        } catch (error) {
          this.isVisible = false;
          this.isOkLoading = false;
          console.error("Error reading file:", error);
          const Toast = Swal.mixin({
            toast: true,
            position: "bottom-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            },
          });
          Toast.fire({
            icon: "error",
            title: `Error: ${error}`,
          });
        }
      } else {
        this.isVisible = false;
        this.isOkLoading = false;
        Swal.fire({
          position: "center",
          title: "Inbulk Leads added!",
          html: `<b>${addedRowCount} row(s) added! </b><br><b>${duplicateAddressesCount} duplicate address(es) found! </b><br><b>${missingRequiredFieldCount} rows has missing required field(s)!</b>`,
          icon: "error",
          showConfirmButton: true,
          width: "26em",
        });
      }
    } else {
      this.isOkLoading = false;
      const Toast = Swal.mixin({
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "error",
        title: `Error! No file selected!`,
      });
    }
  }

  showModal(): void {
    this.isVisible = true;
  }

  // showCallModal(field: string): void {
  //   this.isCallDialogOpen = true;
  //   this.getDespositions()
  // }

  handleOk(): void {
    if (this.file.name !== "") {
      this.isOkLoading = true;
      this.parseCSVAndUpload(this.file);
    } else {
      this.isOkLoading = false;
      const Toast = Swal.mixin({
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "error",
        title: `Error: No file selected!`,
      });
    }
  }

  handleCancel(): void {
    this.isVisible = false;
    this.isCallDialogOpen = false;
    this.resetFile();
  }

  onViewIconClick(leadData: any, editMode: boolean = false) {
    this.router.navigate(["/lead-management/edit-lead"], {
      state: { leadData, editMode },
    });
  }

  // isCallModalVisible = false;
  // isOkLoading = false;
  private leadId: string | undefined;
  private saleExist: boolean | undefined;


  showCallLogModal(lead: any): void {
    console.log("selected data", lead)
    this.sales = []
    this.leadId = lead.docId;
    console.log(this.leadId)
    if (lead.sales) {
      this.saleExist = true
      lead.sales.forEach((log: any) => {
        this.sales.push(log)
      })
    }
    else {
      this.saleExist = false
    }
    this.isCallDialogOpen = true;
    this.getDespositions();
  }

  handleCallLogOk(): void {
    this.callLogForm.value.created_by = this.currentUser.name;
    this.callLogForm.value.lead_id = this.leadId;


    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    };
    this.callLogForm.value.date = new Date().toLocaleDateString(
      undefined,
      options
    );
    const time: Intl.DateTimeFormatOptions = {
      hour: "numeric",
      minute: "numeric",
      hour12: true
    };
    this.callLogForm.value.created_at = new Date().toLocaleTimeString(
      undefined,
      time
    );
    console.log("time", this.callLogForm.value.created_at)

    if (this.callLogForm.valid) {

      this.firestore.addDatatoDb(this.callLogForm.value, "callLogs")
        .then(() => {
          Swal.fire({
            position: "center",
            title: "Call Logged!",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
            width: "26em",
          });
          if (this.callLogForm.value.desposition.toLowerCase() == "sale made") {
            const saleId = Date.now();
            const salesData = { lead_id: this.leadId, sale_id: saleId, installation_date: "", signed_date: "", sales_status: "", company_name: "", ...this.callLogForm.value };
            const docId = this.leadId;
            this.sales.push(salesData)
            const sales = this.sales
            console.log("id", salesData, docId)
            this.firestore
              .updateDataById(docId, "Leads", { sales })
              .then(() => {
                // this.isLoading = false;
                Swal.fire({
                  icon: "success",
                  title: "Call Logged!",
                  showConfirmButton: false,
                  timer: 1500,
                });
                this.callLogForm.reset();
                this.isCallDialogOpen = false;
                this.fetchLeadsData()
              })
              .catch((error) => {
                Swal.fire({
                  icon: "error",
                  title: "Sale not recorded, try again",
                  showConfirmButton: false,
                  timer: 1500,
                });
                console.error("Error updating document:", error);
              });
          }
          else if (this.callLogForm.value.desposition.toLowerCase() == "call back") {
            const currentUserID = this.currentUser.userId;
            const reminder = { ...this.callLogForm.value, user_id: currentUserID };
            this.addReminder(reminder);
          }
          this.callLogForm.reset();
          this.isCallDialogOpen = false;
        })
        .catch(() => {
          Swal.fire({
            position: "center",
            title: "Sale not recorded, try again",
            icon: "error",
            showConfirmButton: false,
            timer: 1500,
            width: "26em",
          });
        });

    } else {
      console.log("not valid", this.callLogForm.errors)
    }

    const callDurationElement = document.getElementById('callDurationErrorMessage');
    if (callDurationElement && this.callLogForm.value.call_duration === null) {
      callDurationElement.style.display = 'block';
    } else if (callDurationElement) {
      callDurationElement.style.display = 'none';
    }

    const despositionElement = document.getElementById('despositionErrorMessage');
    if (despositionElement && this.callLogForm.value.desposition === null) {
      despositionElement.style.display = 'block';
    } else if (despositionElement) {
      despositionElement.style.display = 'none';
    }

  }

  getControlErrors(): { [key: string]: any } {
    const controlErrors: { [key: string]: any } = {};

    Object.keys(this.callLogForm.controls).forEach(controlName => {
      const control = this.callLogForm.get(controlName);
      if (control && control.invalid) {
        controlErrors[controlName] = control.errors;
      }
    });

    return controlErrors;
  }
  handleCallLogCancel(): void {
    this.isCallDialogOpen = false;
  }
  getDespositions() {
    this.firestore.getAllData("Disposition").then((response: any) => {
      this.despositionData = response;
    }).catch((error) => {
      console.error(error);
    });
  }
  callBackDesposition(desposition: string, controlName: string): void {
    // console.log(`Selected value for ${controlName}: `, desposition);
    if (desposition?.toLowerCase() === "call back") {
      this.dateDisable = false;
    } else {
      this.dateDisable = true;
    }
  }

  addReminder(reminder: any): void {
    const reminderData = {
      call_back_date: reminder.call_back_date,
      is_marked_read: false,
      user_id: this.currentUser.userId,
      lead_id: reminder.lead_id,
    };
    this.firestore.addDatatoDb(reminderData, "reminders").then(() => {
      console.log('Reminder added successfully');
    }).catch((error) => {
      console.error('Error adding reminder: ', error);
    });
  }

  extractNumbers(phoneNumber: string): string {
    const regex = /[+\d()-]+/g;
    const numbersOnly = phoneNumber.match(regex)?.join("") || "";
    return numbersOnly;
  }

}


