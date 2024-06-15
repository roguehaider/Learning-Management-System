import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CallHistoryRoutingModule } from './call-history-routing-module';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { DatePipe } from '@angular/common';


import { NzSpinModule } from 'ng-zorro-antd/spin';
import { CallHistoryComponent } from './call-history/call-history.component';

import { NzSelectModule } from "ng-zorro-antd/select";
import { NzInputModule } from "ng-zorro-antd/input";
import { FormsModule } from "@angular/forms";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzTableModule } from "ng-zorro-antd/table";
import { NzDividerModule } from "ng-zorro-antd/divider";
import { ReactiveFormsModule } from "@angular/forms";
import { NzTabsModule } from "ng-zorro-antd/tabs";
import { NzModalModule } from "ng-zorro-antd/modal";
import { NzButtonModule } from "ng-zorro-antd/button";
@NgModule({
  declarations: [CallHistoryComponent],
  providers: [DatePipe],
  imports: [
    CommonModule,
    CallHistoryRoutingModule,
    NzDatePickerModule,
    NzSpinModule,
    NzSelectModule,
    NzInputModule,
    FormsModule,
    NzIconModule,
    NzTableModule,
    NzDividerModule,
    ReactiveFormsModule,
    NzTabsModule,
    NzModalModule,
    NzButtonModule,
    NzDatePickerModule
  ]
})

export class CallHistoryModule {}