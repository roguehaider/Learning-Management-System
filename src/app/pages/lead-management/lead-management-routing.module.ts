import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewLeadsComponent } from './leads/view-leads.component';
import { AddLeadComponent } from './leads/add-lead/add-lead.component';
import { AuthGuardService } from 'src/app/services/guards/auth-guard/auth-guard.service';
import { CanLeaveGuardService } from 'src/app/services/guards/can-leave-guard/can-leave-guard.service';

const routes: Routes = [
  { path: "", component: ViewLeadsComponent,canActivate:[AuthGuardService]},
  { path: "add-lead", component: AddLeadComponent,canActivate:[AuthGuardService], canDeactivate: [CanLeaveGuardService]},
  { path: "edit-lead", component: AddLeadComponent,canActivate:[AuthGuardService], canDeactivate: [CanLeaveGuardService] },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeadManagementRoutingModule { }
