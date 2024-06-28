// import { Injectable } from "@angular/core";
// import {
//   ActivatedRouteSnapshot,
//   CanActivate,
//   RouterStateSnapshot,
//   UrlTree,
//   Router,
// } from "@angular/router";
// import { Observable } from "rxjs";
// import { AuthService } from "../../auth/auth.service";

// @Injectable({
//   providedIn: "root",
// })
// export class AuthGuardService implements CanActivate {
//   constructor(public authService: AuthService, public router: Router) {}

//   canActivate(
//     next: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ):
//     | Observable<boolean | UrlTree>
//     | Promise<boolean | UrlTree>
//     | boolean
//     | UrlTree {
//     let url: string = state.url;
//     return this.checkUserLogin(next, url);
//   }

//   checkUserLogin(route: ActivatedRouteSnapshot, url: any): boolean {

//     if (this.authService.isLoggedIn) {
//       const userRole = this.authService.getRole();
//       if (route.data["role"] && route.data["role"].indexOf(userRole) === -1) {
//         this.router.navigate(["login"]);
//         localStorage.removeItem("user");
//         return false;
//       }
//       return true;
//     }

//     this.router.navigate(["login"]);
//     return false;
//   }
// }

// src/app/auth.guard.ts

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


}

