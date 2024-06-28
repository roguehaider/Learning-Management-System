import { Component } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-layout-teacher',
  templateUrl: './layout-teacher.component.html',
  styleUrls: ['./layout-teacher.component.scss']
})
export class LayoutTeacherComponent {
  isCollapsed = false;
  userName =this.authservice.getUserName();
  constructor(private authservice: AuthService){ }
  
}
