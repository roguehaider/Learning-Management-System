import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AngularFireModule } from "@angular/fire/compat";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { LayoutComponent } from "./layout/layout.component";
import { LoginComponent } from "./pages/authentication/login/login.component";
import { environment } from "src/environments/environment";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { NZ_I18N } from "ng-zorro-antd/i18n";
import { en_US } from "ng-zorro-antd/i18n";
import { registerLocaleData } from "@angular/common";
import en from "@angular/common/locales/en";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NzLayoutModule } from "ng-zorro-antd/layout";
import { NzDropDownModule } from "ng-zorro-antd/dropdown";
import { IconDefinition } from "@ant-design/icons-angular";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzCardModule } from 'ng-zorro-antd/card';


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
import { LandingPageComponent } from "./pages/landing-page/landing-page.component";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzCheckboxModule } from "ng-zorro-antd/checkbox";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzModalModule } from "ng-zorro-antd/modal";
import { NzSelectModule } from "ng-zorro-antd/select";
import { NzSpinModule } from "ng-zorro-antd/spin";
import { NotificationComponent } from './components/notification/notification.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { HomeComponent } from './pages/home/home.component';

const icons: IconDefinition[] = [
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
];

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    LayoutComponent,
    SidebarComponent,
    LandingPageComponent,
    NotificationComponent,
    PageNotFoundComponent,
    HomeComponent,
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
    NzCardModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent],
})
export class AppModule {}
