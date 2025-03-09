import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    if (typeof localStorage === 'undefined') { 
      return false;
    }
  
    const token = localStorage.getItem('token');

    if (!token) {
      console.log('AuthGuard: No token found, redirecting to login'); 
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
  isTokenExpired(token: string): boolean {
    const payload = JSON.parse(atob(token.split('.')[1])); 
    const expiry = payload.exp * 1000; 
    return Date.now() > expiry; 
  }
}
