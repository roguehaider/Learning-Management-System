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
import { HttpClientModule } from "@angular/common/http";
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
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
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US } ,{provide: NZ_ICONS, useValue: icons}], 
  bootstrap: [AppComponent],
})
export class AppModule {}
