import { Component } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  isCollapsed = false;
  userName =this.authService.getUserName();
  constructor(private authService: AuthService, private router: Router){ }

  logout() {
    const user = this.authService.getUser()
    this.authService.logout(user).subscribe(
      response => {
        console.log('Logged out successfully', response);
        // Redirect to login page or home page after logout
        this.router.navigate(['/login']);
      },
      error => {
        console.error('Error during logout', error, user);
      }
    );
  }
}
