import { Component } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-layout-student',
  templateUrl: './layout-student.component.html',
  styleUrls: ['./layout-student.component.scss']
})
export class LayoutStudentComponent {
  isCollapsed = false;
  photo: string | null = null;

  userName =this.authservice.getUserName();
  constructor(private authservice: AuthService){ }
  ngOnInit(): void {
    this.photo = localStorage.getItem('photo');
    console.log(this.photo)
  }
}
