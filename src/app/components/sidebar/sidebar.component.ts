import { Component } from '@angular/core';
// import { AuthService } from "src/app/services/auth/auth.service";
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  isCollapsed = false;



  currentUser: any;
  isSubMenuOpen = false;

  // constructor(private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute) {}

  // ngOnInit(){
  //   const isSubMenuOpen = localStorage.getItem('isSubMenuOpen');
  //   this.isSubMenuOpen = isSubMenuOpen === 'true';
  
  //   if (!this.isSubMenuOpen) {
  //     const currentRoute = this.router.url;
  //     if (currentRoute.includes('lead-management') || currentRoute.includes('call-history') || currentRoute.includes('sales') || currentRoute === "") {
  //       this.isSubMenuOpen = false;
  //       localStorage.setItem('isSubMenuOpen', 'false');
  //     }
  //   }
  
  //   this.router.events.pipe(
  //     filter(event => event instanceof NavigationEnd)
  //   ).subscribe(() => {
  //     this.checkSubMenuOpen();
  //   });

  //   this.router.events.subscribe((event) => {
  //     if (event instanceof NavigationEnd && event.url === '/') {
  //       this.removeActiveClass();
  //     }
  //   });
  //   this.getuser();
  // }

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
  //   ngOnInit() {
  //   let currentUser = null;
  //   let currentLocalStorageUser = localStorage.getItem("user");
  //   let currentSessionUser = sessionStorage.getItem("user");
  //   if (currentLocalStorageUser) {
  //     currentUser = JSON.parse(currentLocalStorageUser!);
  //   } else {
  //     currentUser = JSON.parse(currentSessionUser!);
  //   }
  //   if (currentUser) {
  //     this.currentUser = currentUser;
  //   }
  // }
  

  
  // checkSubMenuOpen(): void {
  //   const currentRoute = this.router.url;

  //   if (currentRoute === "/") {
  //     this.removeActiveClass();
  //     localStorage.setItem('isSubMenuOpen', 'false');
  //   } else {
    
  //     // Your existing code for handling submenu open/close based on current route
  //     let route = this.activatedRoute;
  //     while (route && route.firstChild) {
  //       route.firstChild.params.subscribe(() => {
  //         if (route.firstChild && route.firstChild.snapshot.url.length > 0) {
  //           const firstChildUrl = route.firstChild.snapshot.url[0].path;
  //           if (firstChildUrl === 'account' || firstChildUrl === 'disposition' || firstChildUrl === 'company') {
  //             this.isSubMenuOpen = true;
  //             localStorage.setItem('isSubMenuOpen', 'true');
  //             return;
  //           }
  //         }
  //       });
  //       route = route.firstChild;
  //   }}
  // }
  
  // openSubMenu(): void {
  //   const currentRoute = this.router.url;
  //   if (currentRoute.includes('account') || currentRoute.includes('disposition') || currentRoute.includes('company')) {
  //     this.isSubMenuOpen = true;
  //     localStorage.setItem('isSubMenuOpen', 'true');
  //   } else {
  //     this.isSubMenuOpen = false;
  //     localStorage.setItem('isSubMenuOpen', 'false');
  //   }
  
  //   // if (currentRoute.includes('lead-management') || currentRoute.includes('call-history') || currentRoute.includes('sales') || currentRoute === "") {
  //   //   this.isSubMenuOpen = false;
  //   //   localStorage.setItem('isSubMenuOpen', 'false');
  //   // }
  // }
    
  removeActiveClass() {
    // Find the previously active element
    const previousActiveElement = document.querySelector('.active');
    
    // Remove the 'active' class from the previously active element
    if (previousActiveElement?.classList.contains('active')) {
      previousActiveElement.classList.remove('ant-menu-item-selected');
    }
  }  
}
