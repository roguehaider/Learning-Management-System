import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SalesMadeComponent } from "./sales-made/sales-made.component";
import { SalesRoutingModule } from "./sales-routing.module";
import { NzDatePickerModule } from "ng-zorro-antd/date-picker";
import { NzTableModule } from "ng-zorro-antd/table";
import { NzSelectModule } from "ng-zorro-antd/select";
import { FormsModule } from "@angular/forms";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzModalModule } from "ng-zorro-antd/modal";
import { ReactiveFormsModule } from "@angular/forms";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzSpinModule } from "ng-zorro-antd/spin";
@NgModule({
  declarations: [SalesMadeComponent],
  imports: [
    CommonModule,
    SalesRoutingModule,
    NzDatePickerModule,
    NzTableModule,
    NzSelectModule,
    FormsModule,
    NzButtonModule,
    NzModalModule,
    ReactiveFormsModule,
    NzInputModule,
    NzSpinModule,
  ],
})
export class SalesModule {}
