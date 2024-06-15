import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CallHistoryComponent } from './call-history/call-history.component';
import { AuthGuardService } from 'src/app/services/guards/auth-guard/auth-guard.service';

const routes: Routes = [
  { path: "", component: CallHistoryComponent,canActivate:[AuthGuardService] },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CallHistoryRoutingModule { }
