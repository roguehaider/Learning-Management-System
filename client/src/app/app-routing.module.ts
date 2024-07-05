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
import { AddTeacherComponent } from "./pages/admin/add-teacher/add-teacher.component";
import { AddStudentComponent } from "./pages/admin/add-student/add-student.component";
import { AdminViewAttendanceComponent } from "./pages/admin/admin-view-attendance/admin-view-attendance.component";
import { TeacherDashboardComponent } from "./pages/teacher/teacher-dashboard/teacher-dashboard.component";
import { LayoutTeacherComponent } from "./layout-teacher/layout-teacher.component";
import { AdminLeavesComponent } from "./pages/admin/admin-leaves/admin-leaves.component";
import { TeacherDiaryComponent } from "./pages/teacher/teacher-diary/teacher-diary.component";
import { TeacherViewDiaryComponent } from "./pages/teacher/teacher-view-diary/teacher-view-diary.component";
import { AdminAnnouncementsComponent } from "./pages/admin/admin-announcements/admin-announcements.component";
import { AuthGuard } from "./services/guards/auth-guard/auth-guard.service";
import { AdminClassesComponent } from "./pages/admin/admin-classes/admin-classes.component";
import { TeacherLeavesComponent } from "./pages/teacher/teacher-leaves/teacher-leaves.component";
import { TeacherCoursesComponent } from "./pages/teacher/teacher-courses/teacher-courses.component";
import { AdminCoursesComponent } from "./pages/admin/admin-courses/admin-courses.component";
import { AdminSuggestionsComponent } from "./pages/admin/admin-suggestions/admin-suggestions.component";
import { TeacherAnnouncementsComponent } from "./pages/teacher/teacher-announcements/teacher-announcements.component";
import { TeacherSuggestionsComponent } from "./pages/teacher/teacher-suggestions/teacher-suggestions.component";
import { TeacherAttendanceComponent } from "./pages/teacher/teacher-attendance/teacher-attendance.component";
import { StudentDashboardComponent } from "./pages/student/student-dashboard/student-dashboard.component";
import { LayoutStudentComponent } from "./layout-student/layout-student.component";
import { StudentAnnouncementsComponent } from "./pages/student/student-announcements/student-announcements.component";
import { StudentCoursesComponent } from "./pages/student/student-courses/student-courses.component";
import { StudentGiveRemarksComponent } from "./pages/student/student-give-remarks/student-give-remarks.component";
import { AdminClassDetailComponent } from "./pages/admin/admin-class-detail/admin-class-detail.component";
import { AdminCourseDetailComponent } from "./pages/admin/admin-course-detail/admin-course-detail.component";
import { StudentLeavesComponent } from "./pages/student/student-leaves/student-leaves.component";
const routes: Routes = [
  {
    path: "admin",
    component: LayoutComponent,
    children: [
      { path: "dashboard", component: AdminDashboardComponent, canActivate: [AuthGuard], data: { expectedRole: 'Admin' } },
      { path: "student", component: AdminStudentComponent, canActivate: [AuthGuard], data: { expectedRole: 'Admin' }  },
      { path: "teacher", component: AdminTeacherComponent, canActivate: [AuthGuard], data: { expectedRole: 'Admin' }  },
      { path: "class", component: AdminClassesComponent, canActivate: [AuthGuard], data: { expectedRole: 'Admin' }  },
      { path: "class-detail/:name", component: AdminClassDetailComponent, canActivate: [AuthGuard], data: { expectedRole: 'Admin' }  },
      { path: "courses", component: AdminCoursesComponent, canActivate: [AuthGuard], data: { expectedRole: 'Admin' }  },
      { path: "course-detail/:name", component: AdminCourseDetailComponent, canActivate: [AuthGuard], data: { expectedRole: 'Admin' }  },
      { path: "announcements", component: AdminAnnouncementsComponent, canActivate: [AuthGuard], data: { expectedRole: 'Admin' }  },
      { path: "suggestions", component: AdminSuggestionsComponent, canActivate: [AuthGuard], data: { expectedRole: 'Admin' }  },
      { path: "add-teacher", component: AddTeacherComponent, canActivate: [AuthGuard], data: { expectedRole: 'Admin' }  },
      { path: "add-student", component: AddStudentComponent, canActivate: [AuthGuard], data: { expectedRole: 'Admin' }  },
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
    path: "teacher",
    component: LayoutTeacherComponent,
    children: [
      { path: "dashboard", component: TeacherDashboardComponent, canActivate: [AuthGuard], data: { expectedRole: 'Teacher' }  },
      { path: "announcements", component: TeacherAnnouncementsComponent, canActivate: [AuthGuard], data: { expectedRole: 'Teacher' }  },
      { path: "diary", component: TeacherDiaryComponent, canActivate: [AuthGuard], data: { expectedRole: 'Teacher' }  },
      { path: "courses", component: TeacherCoursesComponent, canActivate: [AuthGuard], data: { expectedRole: 'Teacher' }  },
      { path: "leaves", component: TeacherLeavesComponent, canActivate: [AuthGuard], data: { expectedRole: 'Teacher' }  },
      { path: "view-diary", component: TeacherViewDiaryComponent, canActivate: [AuthGuard], data: { expectedRole: 'Teacher' }  },
      { path: "attendance", component: TeacherAttendanceComponent, canActivate: [AuthGuard], data: { expectedRole: 'Teacher' }  },
      { path: "suggestions", component: TeacherSuggestionsComponent, canActivate: [AuthGuard], data: { expectedRole: 'Teacher' }  },

    ],
  },
  {
    path: "student",
    component: LayoutStudentComponent,
    children: [
      { path: "dashboard", component: StudentDashboardComponent, canActivate: [AuthGuard], data: { expectedRole: 'Student' }  },
      { path: "announcements", component: StudentAnnouncementsComponent, canActivate: [AuthGuard], data: { expectedRole: 'Student' }  },
      { path: "courses", component: StudentCoursesComponent, canActivate: [AuthGuard], data: { expectedRole: 'Student' }  },
      { path: "remarks", component: StudentGiveRemarksComponent, canActivate: [AuthGuard], data: { expectedRole: 'Student' }  },
      { path: "leaves", component: StudentLeavesComponent, canActivate: [AuthGuard], data: { expectedRole: 'Student' }  },

    ],
  },

  {
    path: "",
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
    path: "login",
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
export class AppRoutingModule { }
