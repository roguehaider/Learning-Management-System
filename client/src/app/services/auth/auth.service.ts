// import { Injectable } from "@angular/core";
// import { Router } from "@angular/router";
// import { AngularFireAuth } from "@angular/fire/compat/auth";
// import { FirestoreService } from "../firestore.service";
// import Swal from "sweetalert2";

// @Injectable({
//   providedIn: "root",
// })
// export class AuthService {
//   roleAs: any;
//   auth: any;
//   currentUser: any;

//   constructor(
//     public router: Router,
//     public afAuth: AngularFireAuth,
//     public fireservice: FirestoreService
//   ) { }

//   signIn(email: string, password: string, rememberMe: boolean) {
//     return new Promise((resolve, reject) => {
//       this.afAuth
//         .signInWithEmailAndPassword(email, password)
//         .then((dataa) => {
//           if (dataa?.user) {
//             const userId = dataa.user.uid;

//             this.fireservice
//               .getDataWithWhere("Users", "email", "==", email.toLowerCase())
//               .then((data: any) => {
//                 const { email, is_active, name, role } = data[0];
//                 let user: any = { email, is_active, name, role, userId};
//                 user = JSON.stringify(user);
//                 if (is_active) {
//                   if (rememberMe) {
//                     localStorage.setItem("user", user);
//                   } else {
//                     sessionStorage.setItem("user", user);
//                   }
//                   this.router.navigate(["/"]);
//                   resolve(true);
//                 } else {
//                   Swal.fire({
//                     icon: "error",
//                     title: "Error",
//                     text: `This account is in-active!`,
//                     showConfirmButton: false,
//                     timer: 2500,
//                   });
//                   reject("Account is inactive");
//                 }
//               });
//           }
//         })
//         .catch((error) => {
//           let errorMessage = null;
//           if (error.code === "auth/invalid-login-credentials") {
//             errorMessage = "Invalid user email or password!";
//           }

//           Swal.fire({
//             icon: "error",
//             title: "Error",
//             text: `${errorMessage || error.message}`,
//             showConfirmButton: false,
//             timer: 2500,
//           });
//           reject(error);
//         });
//     });
//   }

//   signOut() {
//     this.afAuth.signOut().then(() => {
//       localStorage.removeItem("user");
//       sessionStorage.removeItem("user");
//       this.router.navigate(["/login"]);
//     });
//   }
//   get isLoggedIn(): boolean {
//     let user = null;
//     let userLocalStorageObj: any = localStorage.getItem("user");
//     let userSessionStorageObj: any = sessionStorage.getItem("user");

//     if (userLocalStorageObj) {
//       user = JSON.parse(userLocalStorageObj);
//     } else {
//       user = JSON.parse(userSessionStorageObj);
//     }

//     return user !== null ? true : false;
//   }

//   getRole() {
//     this.roleAs = JSON.parse(localStorage.getItem("user") || "{}");
//     if (Object.keys(this.roleAs).length == 0) {
//       this.roleAs = JSON.parse(sessionStorage.getItem("user") || "{}");
//     }
//     return this.roleAs.role;
//   }

//   getuser() {
//     let currentUser = null;
//     let currentLocalStorageUser = localStorage.getItem("user");
//     let currentSessionUser = sessionStorage.getItem("user");

//     if (currentLocalStorageUser) {
//       currentUser = JSON.parse(currentLocalStorageUser);
//     } else if (currentSessionUser) {
//       currentUser = JSON.parse(currentSessionUser);
//     }

//     this.currentUser = currentUser;
//     return this.currentUser;
//   }

// }

// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface User {
    _id: string;
    Fname: string;
    Lname: string;
    role: string;
    roll_No: string;
    class_id: string;
    email: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost:8000';

    constructor(private http: HttpClient) { }

    isLoggedIn(): boolean {
        // Check if access token exists in localStorage
        return localStorage.getItem('user') !== null;
    }
    refreshToken(): Observable<any> {
        const refreshToken = localStorage.getItem('refreshToken');
        console.log("token refresh", refreshToken)
        return this.http.post(`${this.apiUrl}refresh`, { refreshToken });
    }
    //Login
    login(credentials: any) {
        return this.http.post<any>('http://localhost:8000/login', credentials)
            .pipe(
                tap(response => {
                    localStorage.setItem('userData', JSON.stringify(response.user));
                })
            );
    }


    getUserRole(): string | null {
        const userData = JSON.parse(localStorage.getItem('userData') || '{}');
        return userData.role || null;
    }
    getUserName(): string | null {
        const userData = JSON.parse(localStorage.getItem('userData') || '{}');
        return userData.Fame || null;
    }

    register(user: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/admin/register`, user);
    }

    getAccessToken(): string | null {
        return localStorage.getItem('accessToken');
    }

    getRefreshToken(): string | null {
        return localStorage.getItem('refreshToken');
    }

    logout(): void {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    }
}
