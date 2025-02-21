
// //? third testing
// import { Injectable } from '@angular/core';
// import { CanActivate, Router } from '@angular/router';
// import { AuthService } from '../services/auth.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanActivate {
//   constructor(private authService: AuthService, private router: Router) {}

//   canActivate(): boolean {
//     if (this.authService.isAuthenticated()) {
//       return true;
//     } else {
//       this.router.navigate(['/admin-login']);
//       return false;
//     }
//   }
// }


import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRole = route.data['role']; // ✅ Expected role from route
    // console.log(expectedRole);

    const userRole = this.authService.getUserRole(); // ✅ Get user role from token
    // console.log(userRole);

    if (userRole && userRole === expectedRole) {
      return true; // ✅ Access allowed
    } else {
      this.router.navigate(['/unauthorized']); // ❌ Unauthorized access redirect
      return false;
    }
  }
}
