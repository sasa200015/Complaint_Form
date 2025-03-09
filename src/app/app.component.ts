import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'Wallet';
  constructor(private router: Router) {}
  ngOnInit(): void {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('token');

      if (token && this.isTokenExpired(token)) {
        console.log('Token expired, logging out...');
        this.logout();
      }
    } else {
      console.log('localStorage is not available');
    }
  }

  logout(): void {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      localStorage.removeItem('token');  
    }
    this.router.navigate(['/login']);  
  }

  private isTokenExpired(token: string): boolean {
    const payload = JSON.parse(atob(token.split('.')[1])); // Decode JWT
    const expiry = payload.exp * 1000; // Convert expiry to milliseconds
    return Date.now() > expiry; // Check if expired
  }
}
