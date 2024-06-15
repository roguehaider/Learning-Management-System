import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalesMadeComponent } from './sales-made/sales-made.component';

const routes: Routes = [
  { path: "", component: SalesMadeComponent },
//   { path: "add-lead", component: AddLeadComponent },
//   { path: "edit-lead", component: AddLeadComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule { }
