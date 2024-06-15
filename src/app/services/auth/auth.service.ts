import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { FirestoreService } from "../firestore.service";
import Swal from "sweetalert2";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  roleAs: any;
  auth: any;
  currentUser: any;

  constructor(
    public router: Router,
    public afAuth: AngularFireAuth,
    public fireservice: FirestoreService
  ) { }

  signIn(email: string, password: string, rememberMe: boolean) {
    return new Promise((resolve, reject) => {
      this.afAuth
        .signInWithEmailAndPassword(email, password)
        .then((dataa) => {
          if (dataa?.user) {
            const userId = dataa.user.uid;
            
            this.fireservice
              .getDataWithWhere("Users", "email", "==", email.toLowerCase())
              .then((data: any) => {
                const { email, is_active, name, role } = data[0];
                let user: any = { email, is_active, name, role, userId};
                user = JSON.stringify(user);
                if (is_active) {
                  if (rememberMe) {
                    localStorage.setItem("user", user);
                  } else {
                    sessionStorage.setItem("user", user);
                  }
                  this.router.navigate(["/"]);
                  resolve(true);
                } else {
                  Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: `This account is in-active!`,
                    showConfirmButton: false,
                    timer: 2500,
                  });
                  reject("Account is inactive");
                }
              });
          }
        })
        .catch((error) => {
          let errorMessage = null;
          if (error.code === "auth/invalid-login-credentials") {
            errorMessage = "Invalid user email or password!";
          }

          Swal.fire({
            icon: "error",
            title: "Error",
            text: `${errorMessage || error.message}`,
            showConfirmButton: false,
            timer: 2500,
          });
          reject(error);
        });
    });
  }

  signOut() {
    this.afAuth.signOut().then(() => {
      localStorage.removeItem("user");
      sessionStorage.removeItem("user");
      this.router.navigate(["/login"]);
    });
  }
  get isLoggedIn(): boolean {
    let user = null;
    let userLocalStorageObj: any = localStorage.getItem("user");
    let userSessionStorageObj: any = sessionStorage.getItem("user");

    if (userLocalStorageObj) {
      user = JSON.parse(userLocalStorageObj);
    } else {
      user = JSON.parse(userSessionStorageObj);
    }

    return user !== null ? true : false;
  }

  getRole() {
    this.roleAs = JSON.parse(localStorage.getItem("user") || "{}");
    if (Object.keys(this.roleAs).length == 0) {
      this.roleAs = JSON.parse(sessionStorage.getItem("user") || "{}");
    }
    return this.roleAs.role;
  }
  
  getuser() {
    let currentUser = null;
    let currentLocalStorageUser = localStorage.getItem("user");
    let currentSessionUser = sessionStorage.getItem("user");
  
    if (currentLocalStorageUser) {
      currentUser = JSON.parse(currentLocalStorageUser);
    } else if (currentSessionUser) {
      currentUser = JSON.parse(currentSessionUser);
    }
  
    this.currentUser = currentUser;
    return this.currentUser;
  }
  
  // getuser() {
  //   let currentUser = null;
  //   let currentLocalStorageUser = localStorage.getItem("user");
  //   let currentSessionUser = sessionStorage.getItem("user");
  //   if (currentLocalStorageUser) {
  //     currentUser = JSON.parse(currentLocalStorageUser!);
  //   } 
  //   else {
  //     currentUser = JSON.parse(currentSessionUser!);
  //   }
  //   if (currentUser) {
  //     this.currentUser = currentUser;
  //   }
  // }
}
