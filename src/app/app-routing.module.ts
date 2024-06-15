import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LayoutComponent } from "./layout/layout.component";
import { LoginComponent } from "./pages/authentication/login/login.component";
import { LeadManagementModule } from "../app/pages/lead-management/lead-management.module";
import { LandingPageComponent } from "./pages/landing-page/landing-page.component";
import { AuthGuardService } from "./services/guards/auth-guard/auth-guard.service";
import { PageNotFoundComponent } from "./pages/page-not-found/page-not-found.component";
import { HomeComponent } from "./pages/home/home.component";
const routes: Routes = [
  {
    
    path: "admin-dashboard",
    component: LayoutComponent,
    children: [
      // { path: "", component: HomeComponent,canActivate:[AuthGuardService] },
      {
        path: "settings",
        loadChildren: () =>
          import(
            "../app/pages/configuration-setting/configuration-setting.module"
          ).then((m) => m.ConfigurationSettingModule),
          data:{role:['admin']}
      },
      {
        path: "lead-management",
        loadChildren: () =>
          import("../app/pages/lead-management/lead-management.module").then(
            (m) => m.LeadManagementModule
          ), data:{role:['admin', 'user']}
      },
      {
        path: "call-history",
        loadChildren: () =>
          import("../app/pages/call-history/call-history.module").then(
            (m) => m.CallHistoryModule
          ), data:{role:['admin', 'user']}
      },
      {
        path: "sales",
        loadChildren: () =>
          import("../app/pages/sales/sales.module").then(
            (m) => m.SalesModule
          ),
          data:{role:['admin', 'user', 'analyst']}
      },
    ],
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: "**",
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
