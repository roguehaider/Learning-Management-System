import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';

import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.scss']
})
export class AdminloginComponent {
  errorMessage: string | undefined;

  credentials = { email: '', password: '' };
  validateForm: FormGroup<{ password: FormControl<string>; email: FormControl<string>; }>;
  constructor(private fb: NonNullableFormBuilder, private authService: AuthService, private router: Router) {
    this.validateForm = this.fb.group({
      password: ['', [Validators.required]],
      email: ['', [Validators.required]],
    });
  }
  // validateForm: FormGroup<{
  //   password: FormControl<string>;
  //   email: FormControl<string>;
  // }>;
  captchaTooltipIcon: NzFormTooltipIcon = {
    type: 'info-circle',
    theme: 'twotone'
  };

  submitForm(): void {
    console.log("clicked")
    this.authService.login(this.credentials)
      .subscribe(
        response => {
          console.log('Login successful:', response);

          // Debug statements
          const userRole = this.authService.getUserRole();
          // localStorage.setItem('user', response.user);
          // After successful login
          localStorage.setItem('user', JSON.stringify(response.user));
          localStorage.setItem('accessToken', response.accessToken);
          localStorage.setItem('refreshToken', response.refreshToken); 

          console.log('User role:', localStorage.getItem('accessToken'));
          

          // Adjust routing based on response.user.role
          if (userRole === 'Admin') {
            console.log('User role:', userRole);
            this.router.navigate(['/admin/dashboard']);
          } 
          else if (userRole === 'Teacher') {
            console.log('User role:', userRole);
            this.router.navigate(['/teacher/dashboard']);
          } 
          else if (userRole === 'Student') {
            console.log('User role:', userRole);
            this.router.navigate(['/student/dashboard']);
          } 
          else {
            console.log('Redirecting to login due to invalid role:', userRole);
            this.router.navigate(['/login']);
          }
        },
        error => {
          console.error('Login error:', error);
          this.errorMessage = error.error.message || 'Unknown error';
        }
      );
  }

  confirmationValidator: ValidatorFn = (control: AbstractControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  getCaptcha(e: MouseEvent): void {
    e.preventDefault();
  }




}
