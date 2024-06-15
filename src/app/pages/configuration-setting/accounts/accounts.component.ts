import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { FirestoreService } from "src/app/services/firestore.service";
interface User {
  name: string;
  role: string;
  email: string;
  password: string;
  is_active: boolean;
}
@Component({
  selector: "app-accounts",
  templateUrl: "./accounts.component.html",
  styleUrls: ["./accounts.component.scss"],
})
export class AccountsComponent {
  listOfData: User[] = [];
  filteredData: User[] = [];
  userNameList: any[] = [];
  emailList: any[] = [];
  userName: string = "";
  email: string = "";
  loader: boolean = true;
  constructor(private firestore: FirestoreService, private router: Router) {
    this.firestore.getAllData("Users").then((response: any) => {
      this.loader = false;
      this.filteredData = [...response];
      this.listOfData = response;
      this.userNameList = [...new Set(response.map((data: any) => data.name))];
      this.emailList = [...new Set(response.map((data: any) => data.email))];
    }).catch((error)=>{
      this.loader = false;
      console.error('Error:', error);
    });
  }
  search(event: any, filterName: string) {
    console.log(event.target.value);

    // if (event.target.value.length > 2) {
    //   this.firestore
    //     .getDataWithWhere("Users", `${filterName}`, ">=", event.target.value)
    //     .then((res: any) => {
    //       console.log(res);
    //       filterName == "name"
    //         ? (this.userNameList = [
    //             ...new Set(res.map((data: any) => data.name)),
    //           ])
    //         : (this.emailList = [
    //             ...new Set(res.map((data: any) => data.email)),
    //           ]);
    //     });
    // } else if (event.target.value.length <= 2) {
    //   filterName == "name"
    //     ? (this.userNameList = [
    //         ...new Set(this.listOfData.map((data: any) => data.name)),
    //       ])
    //     : (this.emailList = [
    //         ...new Set(this.listOfData.map((data: any) => data.email)),
    //       ]);
    // }
  }

  fil(event: any, field: string) {
    console.log(event);
    if (event == null || event == "") {
      this.listOfData = [...this.filteredData];
    } else if (field == "name") {
      this.listOfData = [
        ...this.filteredData.filter((any: any) => any.name == event),
      ];
    } else if (field == "email") {
      this.listOfData = [
        ...this.filteredData.filter((any: any) => any.email == event),
      ];
    }
  }
  onEditIconClick(accountData: any, editMode: boolean = false) {
    this.router.navigate(["/settings/edit-account"], {
      state: { accountData, editMode },
    });
  }
}
