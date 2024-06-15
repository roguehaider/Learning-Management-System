import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ConfigurationSettingRoutingModule } from "./configuration-setting-routing.module";
import { AccountsComponent } from "./accounts/accounts.component";
import { NzDividerModule } from "ng-zorro-antd/divider";
import { NzTableModule } from "ng-zorro-antd/table";
import { AddAccountComponent } from "./accounts/add-account/add-account.component";
import { NzFormModule } from "ng-zorro-antd/form";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NzSelectModule } from "ng-zorro-antd/select";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzTabsModule } from "ng-zorro-antd/tabs";
import { NzModalModule } from "ng-zorro-antd/modal";
import { NzButtonModule } from "ng-zorro-antd/button";
import { DispositionComponent } from "./disposition/disposition.component";
import { NzPaginationModule } from "ng-zorro-antd/pagination";
import { NzToolTipModule } from "ng-zorro-antd/tooltip";
import { CompanyComponent } from "./company/company.component";
import { NzSwitchModule } from "ng-zorro-antd/switch";
import { NzSpinModule } from "ng-zorro-antd/spin";

@NgModule({
  declarations: [
    AccountsComponent,
    AddAccountComponent,
    DispositionComponent,
    CompanyComponent,
  ],
  imports: [
    CommonModule,
    ConfigurationSettingRoutingModule,
    NzTableModule,
    NzPaginationModule,
    NzDividerModule,
    NzFormModule,
    FormsModule,
    NzSelectModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzModalModule,
    NzIconModule,
    NzInputModule,
    NzTabsModule,
    NzSelectModule,
    NzToolTipModule,
    NzSwitchModule,
    NzSpinModule,
  ],
})
export class ConfigurationSettingModule {}
