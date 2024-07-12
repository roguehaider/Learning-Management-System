import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AngularFireModule } from "@angular/fire/compat";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { LayoutComponent } from "./layout/layout.component";
import { environment } from "src/environments/environment";
import { AdminDashboardComponent } from "./pages/admin/admin-dashboard/admin-dashboard.component";
import { AdminAttendanceComponent } from "./pages/admin/admin-attendance/admin-attendance.component";
import { TakeAttendanceComponent } from "./pages/admin/admin-attendance/take-attendance/take-attendance.component";
import { AdminFeeComponent } from "./pages/admin/admin-fee/admin-fee.component";
import { AdminStudentComponent } from "./pages/admin/admin-student/admin-student.component";
import { AdminTeacherComponent } from "./pages/admin/admin-teacher/admin-teacher.component";
import { ApproveStudentsComponent } from "./pages/admin/approve-students/approve-students.component";
import { ApproveTeacherComponent } from "./pages/admin/approve-teacher/approve-teacher.component";
import { AdminNoticeComponent } from "./pages/admin/admin-notice/admin-notice.component";
import { NZ_I18N } from "ng-zorro-antd/i18n";
import { en_US } from "ng-zorro-antd/i18n";
import { registerLocaleData } from "@angular/common";
import en from "@angular/common/locales/en";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NzLayoutModule } from "ng-zorro-antd/layout";
import { NzDropDownModule } from "ng-zorro-antd/dropdown";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzCardModule } from 'ng-zorro-antd/card';
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';


import {
  PhoneOutline,
  EyeInvisibleOutline,
  SettingOutline,
  RiseOutline,
  ContactsOutline,
  CustomerServiceOutline,
  UserOutline,
  LogoutOutline,
  UsergroupAddOutline,
  FileAddOutline,
  ShopOutline,
} from "@ant-design/icons-angular/icons";
import { NzTableModule } from "ng-zorro-antd/table";
import { NzDividerModule } from "ng-zorro-antd/divider";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzCheckboxModule } from "ng-zorro-antd/checkbox";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzModalModule } from "ng-zorro-antd/modal";
import { NzSelectModule } from "ng-zorro-antd/select";
import { NzSpinModule } from "ng-zorro-antd/spin";
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { AdminClickComponent } from './pages/admin-click/admin-click.component';
import { TeacherClickComponent } from './pages/teacher-click/teacher-click.component';
import { ParentClickComponent } from './pages/parent-click/parent-click.component';
import { AboutusComponent } from './pages/aboutus/aboutus.component';
import { ContactusComponent } from './pages/contactus/contactus.component';
import { AdminsignupComponent } from './pages/adminsignup/adminsignup.component';
import { AdminloginComponent } from './pages/adminlogin/adminlogin.component';
import { TeacherloginComponent } from './pages/teacherlogin/teacherlogin.component';
import { ParentloginComponent } from './pages/parentlogin/parentlogin.component';
import { ParentsignupComponent } from './pages/parentsignup/parentsignup.component';
import { TeachersignupComponent } from './pages/teachersignup/teachersignup.component';
import { AddTeacherComponent } from './pages/admin/add-teacher/add-teacher.component';
import { AddStudentComponent } from './pages/admin/add-student/add-student.component';
import { AdminViewAttendanceComponent } from './pages/admin/admin-view-attendance/admin-view-attendance.component';
import { LayoutTeacherComponent } from './layout-teacher/layout-teacher.component';
import { TeacherDashboardComponent } from './pages/teacher/teacher-dashboard/teacher-dashboard.component';
import { TeacherAttendanceComponent } from './pages/teacher/teacher-attendance/teacher-attendance.component';
import { TeacherNoticeComponent } from './pages/teacher/teacher-notice/teacher-notice.component';
import { TeacherViewAttendanceComponent } from './pages/teacher/teacher-view-attendance/teacher-view-attendance.component';
import { AdminLeavesComponent } from './pages/admin/admin-leaves/admin-leaves.component';
import { TeacherDiaryComponent } from './pages/teacher/teacher-diary/teacher-diary.component';
import { TeacherViewDiaryComponent } from './pages/teacher/teacher-view-diary/teacher-view-diary.component';
import { AdminAnnouncementsComponent } from './pages/admin/admin-announcements/admin-announcements.component';
import { AdminClassesComponent } from './pages/admin/admin-classes/admin-classes.component';
import { TeacherLeavesComponent } from './pages/teacher/teacher-leaves/teacher-leaves.component';
import { TeacherCoursesComponent } from './pages/teacher/teacher-courses/teacher-courses.component';
import { AdminCoursesComponent } from './pages/admin/admin-courses/admin-courses.component';
import { AuthService } from "./services/auth/auth.service";
import { TokenInterceptor } from "./services/token-inceptor.service";
import { AdminSuggestionsComponent } from './pages/admin/admin-suggestions/admin-suggestions.component';
import { TeacherAnnouncementsComponent } from './pages/teacher/teacher-announcements/teacher-announcements.component';
import { TeacherSuggestionsComponent } from './pages/teacher/teacher-suggestions/teacher-suggestions.component';
import { LayoutStudentComponent } from './layout-student/layout-student.component';
import { StudentDashboardComponent } from './pages/student/student-dashboard/student-dashboard.component';
import { StudentAnnouncementsComponent } from './pages/student/student-announcements/student-announcements.component';
import { StudentCoursesComponent } from './pages/student/student-courses/student-courses.component';
import { StudentGiveRemarksComponent } from './pages/student/student-give-remarks/student-give-remarks.component';
import { AdminClassDetailComponent } from './pages/admin/admin-class-detail/admin-class-detail.component';
import { AdminCourseDetailComponent } from './pages/admin/admin-course-detail/admin-course-detail.component';
import { StudentLeavesComponent } from './pages/student/student-leaves/student-leaves.component';
import { ToastComponent } from './utils/toast/toast.component';
import { TeacherAssessmentsComponent } from './pages/teacher/teacher-assessments/teacher-assessments.component';
import { TeacherAssessmentMarksComponent } from './pages/teacher/teacher-assessment-marks/teacher-assessment-marks.component';
import { TeacherUpdateAssessmentMarksComponent } from './pages/teacher/teacher-update-assessment-marks/teacher-update-assessment-marks.component';
import { TeacherRemarksComponent } from './pages/teacher/teacher-remarks/teacher-remarks.component';
import { TeacherCourseDetailComponent } from './pages/teacher/teacher-course-detail/teacher-course-detail.component';
import { StudentAttendanceComponent } from './pages/student/student-attendance/student-attendance.component';
import { StudentCourseDetailComponent } from './pages/student/student-course-detail/student-course-detail.component';
import { StudentSuggestionsComponent } from './pages/student/student-suggestions/student-suggestions.component';


// const icons: IconDefinition[] = [
//   PhoneOutline,
//   EyeInvisibleOutline,
//   SettingOutline,
//   RiseOutline,
//   ContactsOutline,
//   CustomerServiceOutline,
//   UserOutline,
//   LogoutOutline,
//   UsergroupAddOutline,
//   FileAddOutline,
//   ShopOutline,
// ];

registerLocaleData(en);

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LayoutComponent,
    PageNotFoundComponent,
    HomeComponent,
    AdminDashboardComponent,
    AdminAttendanceComponent,
    TakeAttendanceComponent,
    AdminFeeComponent,
    AdminStudentComponent,
    AdminTeacherComponent,
    ApproveStudentsComponent,
    ApproveTeacherComponent,
    AdminNoticeComponent,
    AdminClickComponent,
    TeacherClickComponent,
    ParentClickComponent,
    AboutusComponent,
    ContactusComponent,
    AdminsignupComponent,
    AdminloginComponent,
    TeacherloginComponent,
    ParentloginComponent,
    ParentsignupComponent,
    TeachersignupComponent,
    AddTeacherComponent,
    AddStudentComponent,
    AdminViewAttendanceComponent,
    LayoutTeacherComponent,
    TeacherDashboardComponent,
    TeacherAttendanceComponent,
    TeacherNoticeComponent,
    TeacherViewAttendanceComponent,
    AdminLeavesComponent,
    TeacherDiaryComponent,
    TeacherViewDiaryComponent,
    AdminAnnouncementsComponent,
    AdminClassesComponent,
    TeacherLeavesComponent,
    TeacherCoursesComponent,
    AdminCoursesComponent,
    AdminSuggestionsComponent,
    TeacherAnnouncementsComponent,
    TeacherSuggestionsComponent,
    LayoutStudentComponent,
    StudentDashboardComponent,
    StudentAnnouncementsComponent,
    StudentCoursesComponent,
    StudentGiveRemarksComponent,
    AdminClassDetailComponent,
    AdminCourseDetailComponent,
    StudentLeavesComponent,
    ToastComponent,
    TeacherAssessmentsComponent,
    TeacherAssessmentMarksComponent,
    TeacherUpdateAssessmentMarksComponent,
    TeacherRemarksComponent,
    TeacherCourseDetailComponent,
    StudentAttendanceComponent,
    StudentCourseDetailComponent,
    StudentSuggestionsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NzLayoutModule,
    NzDropDownModule,
    BrowserAnimationsModule,
    NzIconModule.forRoot(icons),
    NzTableModule,
    NzDividerModule,
    NzFormModule,
    NzInputModule,
    NzCheckboxModule,
    NzButtonModule,
    ReactiveFormsModule,
    NzModalModule,
    NzSelectModule,
    ReactiveFormsModule,
    NzSpinModule,
    NzCardModule,
    NzAlertModule,
    NzDatePickerModule,
    NzListModule,
    NzProgressModule,
    NzStatisticModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US } ,{provide: NZ_ICONS, useValue: icons},  AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }], 
  bootstrap: [AppComponent],
})
export class AppModule {}
