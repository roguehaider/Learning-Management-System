import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AccountsComponent } from "./accounts/accounts.component";
import { AddAccountComponent } from "./accounts/add-account/add-account.component";
import { DispositionComponent } from "./disposition/disposition.component";
import { AuthGuardService } from "src/app/services/guards/auth-guard/auth-guard.service";
import { CompanyComponent } from "./company/company.component";

const routes: Routes = [
  {
    path: "account",
    component: AccountsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "add-account",
    component: AddAccountComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "edit-account",
    component: AddAccountComponent,
    canActivate: [AuthGuardService],
  },

  {
    path: "disposition",
    component: DispositionComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "company",
    component: CompanyComponent,
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfigurationSettingRoutingModule {}
