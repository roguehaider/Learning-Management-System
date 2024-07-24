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
import { ToastService } from 'src/app/utils/toast.service';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.scss']
})
export class AdminloginComponent {
  errorMessage: string | undefined;

  credentials = { email: '', password: '' };
  validateForm: FormGroup<{ password: FormControl<string>; email: FormControl<string>; }>;
  constructor(private fb: NonNullableFormBuilder,private toastService:ToastService, private authService: AuthService, private router: Router) {
    this.validateForm = this.fb.group({
      password: ['', [Validators.required]],
      email: ['', [Validators.required]],
    });
  }
  captchaTooltipIcon: NzFormTooltipIcon = {
    type: 'info-circle',
    theme: 'twotone'
  };

  // submitForm(): void {
  //   console.log("clicked")
  //   this.authService.login(this.credentials)
  //     .subscribe(
  //       response => {
  //         console.log('Login successful:', response);

  //         // Debug statements
  //         const userRole = this.authService.getUserRole();
  //         // localStorage.setItem('user', response.user);
  //         // After successful login
  //         localStorage.setItem('user', JSON.stringify(response.user));
  //         localStorage.setItem('accessToken', response.accessToken);
  //         localStorage.setItem('refreshToken', response.refreshToken); 
  //         localStorage.setItem('photo', response.user.photo);
          
  //         console.log('User role:', localStorage.getItem('accessToken'));
          
          

  //         // Adjust routing based on response.user.role
  //         if (userRole === 'Admin') {
  //           console.log('User role:', userRole);
  //           this.router.navigate(['/admin/dashboard']);
  //           this.toastService.showToast('success', 'Admin Login Successfully!');
  //         } 
  //         else if (userRole === 'Teacher') {
  //           console.log('User role:', userRole);
  //           this.router.navigate(['/teacher/dashboard']);
  //           this.toastService.showToast('success', 'Teacher Login Successfully!');
  //         } 
  //         else if (userRole === 'Student') {
  //           console.log('User role:', userRole);
  //           this.router.navigate(['/student/dashboard']);
  //           this.toastService.showToast('success', 'Student Login Successfully!');
  //         } 
  //         else {
  //           console.log('Redirecting to login due to invalid role:', userRole);
  //           this.router.navigate(['/login']);
  //           this.toastService.showToast('warning', 'Redirecting to login due to invalid role! ');
            
  //         }
  //       },
  //       error => {
  //         console.error('Login error:', error);
  //         const errorMessage = error.message ? error.message : 'An error occurred';
  //         this.toastService.showToast('error', errorMessage);
  //       }
  //     );
  // }

  submitForm(): void {
    console.log("clicked");
    this.authService.login(this.credentials)
      .subscribe(
        response => {
          console.log('Login successful:', response);
  
          // Set user data in localStorage
          localStorage.setItem('user', JSON.stringify(response.user));
          localStorage.setItem('photo', response.user.photo);
  
         // Clear existing cookies
         document.cookie = `accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
         document.cookie = `refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
 
         // Set new cookies
         document.cookie = `accessToken=${response.accessToken}; path=/; max-age=3600;`;
         document.cookie = `refreshToken=${response.refreshToken}; path=/; max-age=3600;`;
 
         console.log('Set cookies:', document.cookie); // Debug: Verify cookies
 
          // Adjust routing based on response.user.role
          const userRole = this.authService.getUserRole();
          if (userRole === 'Admin') {
            console.log('User role:', userRole);
            this.router.navigate(['/admin/dashboard']);
            this.toastService.showToast('success', 'Admin Login Successfully!');
          } 
          else if (userRole === 'Teacher') {
            console.log('User role:', userRole);
            this.router.navigate(['/teacher/dashboard']);
            this.toastService.showToast('success', 'Teacher Login Successfully!');
          } 
          else if (userRole === 'Student') {
            console.log('User role:', userRole);
            this.router.navigate(['/student/dashboard']);
            this.toastService.showToast('success', 'Student Login Successfully!');
          } 
          else {
            console.log('Redirecting to login due to invalid role:', userRole);
            this.router.navigate(['/login']);
            this.toastService.showToast('warning', 'Redirecting to login due to invalid role!');
          }
        },
        error => { 
          console.error('Login error:', error);
          const errorMessage = error.message ? error.message : 'An error occurred';
          this.toastService.showToast('error', errorMessage);
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
