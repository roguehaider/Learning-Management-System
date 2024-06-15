import { Time, formatDate } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { NzTableComponent } from 'ng-zorro-antd/table';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DatePipe } from '@angular/common';
import { Timestamp } from "firebase/firestore"; 

export interface callLog {
  date: string;
  created_at: Date;
  owner_name: string;
  business_name: string;
  phone_number: number;
  full_address: string;
  address_city: string;
  address_state: string;
  call_duration: number;
  created_by: string;
  desposition: string;
  comment: string;
  id: string;
}

@Component({
  selector: "app-call-history",
  templateUrl: "./call-history.component.html",
  styleUrls: ["./call-history.component.scss"],
})

export class CallHistoryComponent {
  callLogData: callLog[] = [];
  filteredCallLogData: callLog[] = [];
  OwnerNameOptions: string[] = [];
  BusinessNameOptions: string[] = [];
  dateOptions: string[] = [];
  callDurationOptions: number[] = [];
  despositionOptions: string[] = [];
  created_byOptions: string[] = [];
  cityOptions: string[] = [];
  stateOptions: string[] = [];
  comment: string[] = [];
  id: string[] = [];
  phoneNumberOptions: number[] = [];
  OwnerNameFilter: string = "";
  BusinessNameFilter: string = "";
  despositionFilter = null;
  created_byFilter = null;
  cityFilter = null;
  stateFilter = null;
  dateFilter: string = "";
  phoneNumberFilter = null;
  size: "large" | "small" | "default" = "default";
  dateRange!: Date[];
  loader: boolean = true;
  currentUser: any;


  constructor(private firestore: FirestoreService, public authService: AuthService,private datePipe: DatePipe) {
    this.callLogData = [];
    this.getuser();
    this.fetchCalls();
  }

  getuser() {
    const user = this.authService.getuser();
    this.currentUser = user;
  }

  fetchCalls() {
    this.callLogData = [];
    if (this.currentUser.role === "user") {
      this.firestore.getDataWithWhere("callLogs", "created_by", "==", this.currentUser.name)
        .then((response: any) => {
          this.fetchCallLogsData(response);
        })
    }
    else if (this.currentUser.role === "admin" || this.currentUser.role === "analyst") {
      this.firestore.getAllData("callLogs").then((response: any) => {
        let result: any = null;
        this.fetchCallLogsData(response);
      });
    }
  }
  
  convertDateTimeFromSeconds(timestamp: any): string {
    if (timestamp && timestamp instanceof Timestamp) {
      const date = timestamp.toDate();
      return this.datePipe.transform(date, "hh:mm a")!;
    }
    return "";
  } 
  fetchCallLogsData(response: any): void {
    this.callLogData = [];

    let result: any = null;

    let callLogs: Map<string, any> = new Map();

    response.forEach((log: any) => {
  
    
      this.callLogData.push(log); 
      const leadId = log.lead_id;
      this.firestore.getById(leadId, "Leads").then((leadResponse: any) => {
        result = leadResponse;
        this.loader = false;

        callLogs.set(leadId, log);
        const {
          phone_number,
          first_name,
          last_name,
          full_address,
          address_city,
          address_state,
          business_name,
          business_type,
          lead_id,
        } = result;
        log.business_type = business_type;
        log.business_name = business_name;
        log.phone_number = phone_number;
        log.full_address = full_address;
        log.address_city = address_city;
        log.address_state = address_state;
        log.lead_id = leadId;
        log.owner_name = first_name + " " + last_name;

        this.BusinessNameOptions = Array.from(
          new Set(
            [...this.BusinessNameOptions, result.business_name].filter(
              (value) => value != null && value !== ""
            )
          )
        );
        this.phoneNumberOptions = Array.from(
          new Set(
            [...this.phoneNumberOptions, result.phone_number].filter(
              (value) => value != null && value !== ""
            )
          )
        );
        this.OwnerNameOptions = Array.from(
          new Set(
            [...this.OwnerNameOptions, log.owner_name].filter(
              (value) => value != null && value !== ""
            )
          )
        );
        this.cityOptions = Array.from(
          new Set(
            [...this.cityOptions, log.address_city].filter(
              (value) => value != null && value !== ""
            )
          )
        );
        this.stateOptions = Array.from(
          new Set(
            [...this.stateOptions, log.address_state].filter(
              (value) => value != null && value !== ""
            )
          )
        );
        this.created_byOptions = Array.from(
          new Set(
            [...this.created_byOptions, log.created_by].filter(
              (value) => value != null && value !== ""
            )
          )
        );
        this.despositionOptions = Array.from(
          new Set(
            [...this.despositionOptions, log.desposition].filter(
              (value) => value != null && value !== ""
            )
          )
        );
        this.filteredCallLogData = this.callLogData;
      }).catch((error) => {
        this.loader = false;
        console.error(error);
      });
    });
  }


  fil(event: any, field: string) {
    if (event == null || event == "") {
      this.callLogData = [...this.filteredCallLogData];
    } else if (field == "desposition") {
      this.callLogData = [
        ...this.filteredCallLogData.filter(
          (any: any) => any.desposition == event
        ),
      ];
    } else if (field == "created_by") {
      this.callLogData = [
        ...this.filteredCallLogData.filter(
          (any: any) => any.created_by == event
        ),
      ];
    } else if (field == "phone_number") {
      this.callLogData = [
        ...this.filteredCallLogData.filter(
          (any: any) => any.phone_number == event
        ),
      ];
    } else if (field == "address_city") {
      this.callLogData = [
        ...this.filteredCallLogData.filter(
          (any: any) => any.address_city == event
        ),
      ];
    } else if (field == "address_state") {
      this.callLogData = [
        ...this.filteredCallLogData.filter(
          (any: any) => any.address_state == event
        ),
      ];
    } else if (field == "business_name") {
      this.callLogData = [
        ...this.filteredCallLogData.filter(
          (any: any) => any.business_name == event
        ),
      ];
    } else if (field == "owner_name") {
      this.callLogData = [
        ...this.filteredCallLogData.filter(
          (any: any) => any.owner_name == event
        ),
      ];
    } else if (field == "date") {
      const startDate = event[0];
      const endDate = event[1];

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

      this.callLogData = [
        ...this.filteredCallLogData.filter((any: any) => {
          const logDate = new Date(any.date);
          const formattedlogDate = logDate.toLocaleDateString("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
          });
          return (
            formattedlogDate >= formattedstartDate &&
            formattedlogDate <= formattedendDate
          );
        }),
      ];
    }
  }

  clearFilteredSelection() {
    this.dateFilter = "";
    this.fil(null, "");
  }

}
