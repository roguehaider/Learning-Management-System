import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { LeadManagementRoutingModule } from "./lead-management-routing.module";
import { ViewLeadsComponent } from "./leads/view-leads.component";
import { NzTableModule } from "ng-zorro-antd/table";
import { NzDividerModule } from "ng-zorro-antd/divider";
import { NzFormModule } from "ng-zorro-antd/form";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NzSelectModule } from "ng-zorro-antd/select";
import { AddLeadComponent } from "./leads/add-lead/add-lead.component";
import { NzModalModule } from "ng-zorro-antd/modal";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzToolTipModule } from "ng-zorro-antd/tooltip";
import { NzInputNumberModule } from "ng-zorro-antd/input-number";
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSpinModule } from "ng-zorro-antd/spin";



@NgModule({
  declarations: [ViewLeadsComponent, AddLeadComponent],
  imports: [
    CommonModule,
    LeadManagementRoutingModule,
    NzTableModule,
    NzDividerModule,
    NzFormModule,
    FormsModule,
    NzSelectModule,
    ReactiveFormsModule,
    NzModalModule,
    NzIconModule,
    NzToolTipModule,
    NzInputNumberModule,
    NzDatePickerModule,
    NzInputModule,
    NzSpinModule,
  ],
})
export class LeadManagementModule {}
