import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree, 
  CanDeactivate } from '@angular/router';

import { Observable } from "rxjs";
import { AuthService } from "../../auth/auth.service";

export interface CanComponentLeave {
  canLeave: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable({
  providedIn: 'root'
})

  export class CanLeaveGuardService implements CanDeactivate<CanComponentLeave> {
    canDeactivate(
      component: CanComponentLeave
    ): Observable<boolean> | Promise<boolean> | boolean {
      return component.canLeave ? component.canLeave() : true;
    }
  
}
