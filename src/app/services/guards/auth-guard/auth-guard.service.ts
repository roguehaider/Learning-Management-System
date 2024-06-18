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
