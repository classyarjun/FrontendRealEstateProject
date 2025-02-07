
import { Injectable } from '@angular/core';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  getToken(): string | null {
    const cookie = document.cookie
      .split('; ')
      .find(row => row.startsWith('token='));
    return cookie ? cookie.split('=')[1] : null;
  }

  getAdminId(): number | null {
    const token = this.getToken();
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        return decoded.adminId || null; // JWT payload me adminId hona chahiye
      } catch (error) {
        console.error('Invalid JWT Token', error);
        return null;
      }
    }
    return null;
  }
}
