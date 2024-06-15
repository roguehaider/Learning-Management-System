import { Component } from "@angular/core";
import { FirestoreService } from "src/app/services/firestore.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BooleanInput } from "ng-zorro-antd/core/types";
import { AuthService } from "src/app/services/auth/auth.service";

export interface sales {
  docId: string;
  date: string;
  signed_date: string;
  owner_name: string;
  business_name: string;
  business_type: string;
  phone_number: number;
  full_address: string;
  address_city: string;
  address_state: string;
  created_by: string;
  company_name: string;
  comment: string;
  installation_date: string;
  sales_status: string;
  lead_id: string;
}

@Component({
  selector: "app-sales-made",
  templateUrl: "./sales-made.component.html",
  styleUrls: ["./sales-made.component.scss"],
})
export class SalesMadeComponent {
  size: "large" | "small" | "default" = "default";
  dateRange!: Date[];
  signeddateRange!: Date[];
  installationdateRange!: Date[];
  salesData: sales[] = [];
  filteredSalesData: sales[] = [];
  OwnerNameOptions: string[] = [];
  CreatedByOptions: string[] = [];
  SalesStatusOptions: string[] = [];
  BusinessNameOptions: string[] = [];
  CompanyOptions: string[] = [];
  DateOptions: string[] = [];
  signDateOptions: string[] = [];
  installationDateOptions: string[] = [];
  cityOptions: string[] = [];
  stateOptions: string[] = [];
  salesStatusOptions: string[] = [];
  comment: string[] = [];
  lead_id: string[] = [];
  phoneNumberOptions: number[] = [];
  dateFilter: string = "";
  signedDateFilter: string = "";
  installationDateFilter: string = "";
  OwnerNameFilter: string = "";
  SalesStatusFilter: string = "";
  CreatedbyFilter: string = "";
  BusinessNameFilter: string = "";
  CompanyFilter: string = "";
  stateFilter = null;
  cityFilter = null;
  phoneNumberFilter = null;
  updateStatusId: string = ''
  updateSaleId: string = ''
  isVisible = false;
  isOkLoading = false;
  companyData: any = [];
  statusForm!: FormGroup;
  loader: boolean = true;
  currentUser: any;
  isAdmin: boolean = false;



  constructor(private firestore: FirestoreService, private fb: FormBuilder, public authService: AuthService) {
    this.salesData = [];
    this.getuser();
    this.fetchSalesData();
    this.getCompanies();
    this.statusForm = this.fb.group({
      company_name: ["", Validators.required],
      sales_status: ["", Validators.required],
      comment: [""],
      signed_date: "",
      installation_date: "",
      sale_id: [""]
    });

    this.checkUser();

  }

  getuser() {
    const user = this.authService.getuser();
    this.currentUser = user;
  }

  checkUser() {
    console.log(this.currentUser.role)
    if (this.currentUser.role == 'analyst') {
      this.isAdmin = true;
    }
    else {
      this.isAdmin == false;

    }
  }

  saleStatus = [
    { label: "Pending", sales_status: "pending" },
    { label: "Sale Made", sales_status: "sale made" },
    { label: "Under Review", sales_status: "under review" },
    { label: "Approved/Agreement to be Sent", sales_status: "approved" },
    { label: "Rejected from All", sales_status: "rejected" },
    { label: "Agreement Sent", sales_status: "agreement sent" },
    { label: "Agreement Void", sales_status: "agreement void" },
    { label: "Signed", sales_status: "signed" },
    { label: "Order Submitted", sales_status: "order submitted" },
    { label: "Installation Scheduled", sales_status: "installation scheduled" },
    { label: "Installed", sales_status: "installed" },
    { label: "Installation Cancelled", sales_status: "installation cancelled" },
    { label: "Installation Delayed", sales_status: "installation delayed" },
  ];



  getCompanies() {
    this.firestore.getAllData("Company").then((response: any) => {
      this.companyData = response;
    });
  }

  selectedIndex = -1;
  showModal(selectedData: any): void {
    this.isVisible = true;
    this.selectedIndex = this.salesData.indexOf(selectedData);
    this.updateStatusId = selectedData.lead_id
    this.statusForm.patchValue({
      sale_id: selectedData.sale_id,
      sales_status: selectedData.sales_status,
      company_name: selectedData.company_name,
      installation_date: selectedData.installation_date,
      signed_date: selectedData.signed_date,
      comment: selectedData.comment,
      lead_id: selectedData.lead_id,

    });
  }

  formatDate(date: Date | string | null | undefined): string {
    if (!date) {
      return "";
    }

    if (!(date instanceof Date)) {
      date = new Date(date);
    }

    return date.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
  }

  handleOk(): void {
    let sales: any = [];
    const updatedValues = this.statusForm.value;
    const salesData = {
      sale_id: updatedValues.sale_id,
      sales_status: updatedValues.sales_status,
      company_name: updatedValues.company_name,
      installation_date: this.formatDate(updatedValues.installation_date),
      signed_date: this.formatDate(updatedValues.signed_date),
      desposition: updatedValues.comment,
    };
    this.salesData.forEach((log: any) => {
      if (log.docId === this.updateStatusId && log.sale_id){
        const saleData = {
          lead_id: log.docId,
          sale_id: log.sale_id,
          sales_status: log.sales_status,
          created_by: log.created_by,
          signed_date: log.signed_date,
          installation_date: log.installation_date,
          company_name: log.company_name,
          comment: log.comment,
          date: log.date,
        };
      sales.push(saleData)
      }
    })
    sales.forEach((log:any) => {

      if(log.sale_id === updatedValues.sale_id){
        log.sales_status = updatedValues.sales_status
        log.company_name = updatedValues.company_name
        log.installation_date = this.formatDate(updatedValues.installation_date)
        log.signed_date = this.formatDate(updatedValues.signed_date)
        log.comment = updatedValues.comment     
      }
    })
    if (this.updateStatusId) {

      this.firestore
        .updateDataById(this.updateStatusId, "Leads", {sales})
        .then(() => {
          this.fetchSalesData();
          this.isVisible = false;
        });
    }
  }

  handleCancel(): void {
    this.isVisible = false;
  }


  fetchSalesData(): void {
    this.salesData = [];
    let result: any = [];
    let sales: any = [];


    this.firestore.getAllData("Leads").then((response: any) => {
      this.loader = false;
      result = response.filter((log: any) => log.sales);
      result.forEach((lead: any) => {
        const sale = lead.sales
        sale.forEach((sale: any) => {
          const newSaleData = {
            ...lead,
            lead_id: lead.docId,
            sale_id: sale.sale_id,
            sales_status: sale.sales_status,
            created_by: sale.created_by,
            signed_date: sale.signed_date,
            installation_date: sale.installation_date,
            company_name: sale.company_name,
            comment: sale.comment,
            date: sale.date,
            owner_name: lead.first_name + " " + lead.last_name
          };
          sales.push(newSaleData)
          this.phoneNumberOptions = Array.from(
            new Set(
              [...this.phoneNumberOptions, lead.phone_number].filter(
                (value) => value != null && value !== ""
              )
            )
          );
          this.OwnerNameOptions = Array.from(
            new Set(
              [...this.OwnerNameOptions, response.owner_name].filter(
                (value) => value != null && value !== ""
              )
            )
          );
          this.cityOptions = Array.from(
            new Set(
              [...this.cityOptions, lead.address_city].filter(
                (value) => value != null && value !== ""
              )
            )
          );
          this.stateOptions = Array.from(
            new Set(
              [...this.stateOptions, lead.address_state].filter(
                (value) => value != null && value !== ""
              )
            )
          );
          this.CreatedByOptions = Array.from(
            new Set(
              [...this.CreatedByOptions, sale.created_by].filter(
                (value) => value != null && value !== ""
              )
            )
          );
        })
      });
      this.salesData = sales;

      
      this.filteredSalesData = this.salesData;
    }).catch((error) => {
      this.loader = false;
      console.error(error);
    });


    this.companyData.forEach((log: any) => {
      this.CompanyOptions = Array.from(
        new Set(
          [...this.CompanyOptions, log.company_name].filter(
            (value) => value != null && value !== ""
          )
        )
      );
    });
    this.saleStatus.forEach((log: any) => {
      this.salesStatusOptions = Array.from(
        new Set(
          [...this.salesStatusOptions, log.sales_status].filter(
            (value) => value != null && value !== ""
          )
        )
      );
    });
  }

  fil(event: any, field: string) {
    if (event == null || event === "") {
      this.salesData = [...this.filteredSalesData];
    } else {
      this.salesData = [
        ...this.filteredSalesData.filter((log: any) => {
          switch (field) {
            case "created_by":
            case "owner_name":
            case "phone_number":
            case "address_city":
            case "address_state":
            case "business_name":
            case "company_name":
              return log[field] === event;
            case "sales_status":
              return log[field] === event.sales_status;
            case "date":
              const start_Date = event[0];
              const end_Date = event[1];

              const date = new Date(log.date);
              const formattedstart_Date = start_Date.toLocaleDateString("en-US", {
                month: "2-digit",
                day: "2-digit",
                year: "numeric",
              });
              const formattedend_Date = end_Date.toLocaleDateString("en-US", {
                month: "2-digit",
                day: "2-digit",
                year: "numeric",
              });
              const formattedDate = date.toLocaleDateString(
                "en-US",
                { month: "2-digit", day: "2-digit", year: "numeric" }
              );

              return (
                formattedDate >= formattedstart_Date &&
                formattedDate <= formattedend_Date
              );
            case "signed_date":
              const startDate = event[0];
              const endDate = event[1];

              const signed_date = new Date(log.signed_date);
              const formattedstartDate = startDate.toLocaleDateString("en-US", {
                month: "2-digit",
                day: "2-digit",
                year: "numeric",
              });
              const formattedendDate = endDate.toLocaleDateString("en-US", {
                month: "2-digit",
                day: "2-digit",
                year: "numeric",
              });
              const formattedSignedDate = signed_date.toLocaleDateString(
                "en-US",
                { month: "2-digit", day: "2-digit", year: "numeric" }
              );

              return (
                formattedSignedDate >= formattedstartDate &&
                formattedSignedDate <= formattedendDate
              );
            case "installation_date":
              const insStartDate = event[0];
              const insEndDate = event[1];

              const installation_date = new Date(log.installation_date);
              const formattedstartDateIns = insStartDate.toLocaleDateString(
                "en-US",
                { month: "2-digit", day: "2-digit", year: "numeric" }
              );
              const formattedendDateIns = insEndDate.toLocaleDateString(
                "en-US",
                { month: "2-digit", day: "2-digit", year: "numeric" }
              );
              const formattedInstallationDate =
                installation_date.toLocaleDateString("en-US", {
                  month: "2-digit",
                  day: "2-digit",
                  year: "numeric",
                });

              return (
                formattedInstallationDate >= formattedstartDateIns &&
                formattedInstallationDate <= formattedendDateIns
              );

            default:
              return this.salesData;
          }
        }),
      ];
    }
  }
  clearFilteredSelection() {
    // this.dateFilter = "";
    this.fil(null, "");
  }
}
