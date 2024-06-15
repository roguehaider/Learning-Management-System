import { Component } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {
  currentUser: any;
  constructor(){
    this.getuser();
  }
  getuser() {
    let currentUser = null;
    let currentLocalStorageUser = localStorage.getItem("user");
    let currentSessionUser = sessionStorage.getItem("user");
    if (currentLocalStorageUser) {
      currentUser = JSON.parse(currentLocalStorageUser!);
    } else {
      currentUser = JSON.parse(currentSessionUser!);
    }
    if (currentUser) {
      this.currentUser = currentUser;
    }
    console.log("user",currentUser)
  }
}
