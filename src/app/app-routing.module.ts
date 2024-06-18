import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LayoutComponent } from "./layout/layout.component";
// import { AuthGuardService } from "./services/guards/auth-guard/auth-guard.service";
import { PageNotFoundComponent } from "./pages/page-not-found/page-not-found.component";
import { HomeComponent } from "./pages/home/home.component";
import { AdminAttendanceComponent } from "./pages/admin/admin-attendance/admin-attendance.component";
import { AdminDashboardComponent } from "./pages/admin/admin-dashboard/admin-dashboard.component";
import { AdminFeeComponent } from "./pages/admin/admin-fee/admin-fee.component";
import { AdminNoticeComponent } from "./pages/admin/admin-notice/admin-notice.component";
import { AdminStudentComponent } from "./pages/admin/admin-student/admin-student.component";
import { AdminTeacherComponent } from "./pages/admin/admin-teacher/admin-teacher.component";
import { ApproveStudentsComponent } from "./pages/admin/approve-students/approve-students.component";
import { ApproveTeacherComponent } from "./pages/admin/approve-teacher/approve-teacher.component";
import { TakeAttendanceComponent } from "./pages/admin/admin-attendance/take-attendance/take-attendance.component";
import { AdminClickComponent } from "./pages/admin-click/admin-click.component";
import { ParentClickComponent } from "./pages/parent-click/parent-click.component";
import { TeacherClickComponent } from "./pages/teacher-click/teacher-click.component";
import { AboutusComponent } from "./pages/aboutus/aboutus.component";
import { ContactusComponent } from "./pages/contactus/contactus.component";
import { AdminsignupComponent } from "./pages/adminsignup/adminsignup.component";
import { AdminloginComponent } from "./pages/adminlogin/adminlogin.component";
import { TeachersignupComponent } from "./pages/teachersignup/teachersignup.component";
import { TeacherloginComponent } from "./pages/teacherlogin/teacherlogin.component";
import { ParentsignupComponent } from "./pages/parentsignup/parentsignup.component";
import { ParentloginComponent } from "./pages/parentlogin/parentlogin.component";
const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
       { path: "admin-dashboard", component: AdminDashboardComponent},
       { path: "admin-teacher", component: AdminTeacherComponent},
       { path: "admin-student", component: AdminStudentComponent},
       { path: "admin-attendance", component: AdminAttendanceComponent},
       { path: "admin-fee", component: AdminFeeComponent},
       { path: "admin-notice", component: AdminNoticeComponent},
       { path: "admin-approve-student", component: ApproveStudentsComponent},
       { path: "admin-approve-teacher", component: ApproveTeacherComponent},
       { path: "admin-take-attendance", component: TakeAttendanceComponent},

      // { path: "", component: HomeComponent,canActivate:[AuthGuardService] },
      // {
      //   path: "settings",
      //   loadChildren: () =>
      //     import(
      //       "../app/pages/configuration-setting/configuration-setting.module"
      //     ).then((m) => m.ConfigurationSettingModule),
      //     data:{role:['admin']}
      // },
      // {
      //   path: "lead-management",
      //   loadChildren: () =>
      //     import("../app/pages/lead-management/lead-management.module").then(
      //       (m) => m.LeadManagementModule
      //     ), data:{role:['admin', 'user']}
      // },
      // {
      //   path: "call-history",
      //   loadChildren: () =>
      //     import("../app/pages/call-history/call-history.module").then(
      //       (m) => m.CallHistoryModule
      //     ), data:{role:['admin', 'user']}
      // },
      // {
      //   path: "sales",
      //   loadChildren: () =>
      //     import("../app/pages/sales/sales.module").then(
      //       (m) => m.SalesModule
      //     ),
      //     data:{role:['admin', 'user', 'analyst']}
      // },
    ],
  },

  {
    path: "home",
    component: HomeComponent,
  },
  {
    path: "admin-click",
    component: AdminClickComponent,
  },
  {
    path: "parent-click",
    component: ParentClickComponent,
  },
  {
    path: "teacher-click",
    component: TeacherClickComponent,
  },
  {
    path: "aboutus",
    component: AboutusComponent,
  },
  {
    path: "contactus",
    component: ContactusComponent,
  },
  {
    path: "adminsignup",
    component: AdminsignupComponent,
  },
  {
    path: "adminlogin",
    component: AdminloginComponent,
  },
  {
    path: "teachersignup",
    component: TeachersignupComponent,
  },
  {
    path: "teacherlogin",
    component: TeacherloginComponent,
  },
  {
    path: "parentsignup",
    component: ParentsignupComponent,
  },
  {
    path: "parentlogin",
    component: ParentloginComponent,
  },
  {
    path: "**",
    component: PageNotFoundComponent,
  },
  {
    path: "admin-dashboard",
    component: LayoutComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
