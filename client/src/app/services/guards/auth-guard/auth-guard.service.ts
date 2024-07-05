import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) { }


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.authService.isLoggedIn()) {
          const userRole = this.authService.getUserRole();
          console.log("auth", userRole)
          // Check if the user role allows access to the route
          if (route.data['roles'] && !route.data['roles'].includes(userRole)) {
            // Redirect to unauthorized page or handle as needed
            this.router.navigate(['/unauthorized']);
            return false;
          }
    
          // User is authenticated and role is allowed
          return true;
        }
    
        // User is not logged in, redirect to login page
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
      }

      canAttendanceActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
      ): Observable<boolean> | Promise<boolean> | boolean {
        const user = this.authService.getUserDetails(); // Implement getUserDetails in AuthService
        if (user && user.IsClassTeacher) {
          return true;
        }
        // Redirect to a not authorized page or login page
        this.router.navigate(['/not-authorized']);
        return false;
      }
}

