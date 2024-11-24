import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

interface AuthUser {
  username: string;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly storageKey = 'auth_user';
  private apiUrl = 'https://fakestoreapi.com';
  
  isAuthenticated = signal<boolean>(this.checkInitialAuth());
  currentUser = signal<AuthUser | null>(this.getStoredUser());

  constructor(private router: Router) {}

  async login(username: string, password: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.apiUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password })
      });

      if (!response.ok) throw new Error('Invalid credentials');

      const data = await response.json();
      const user: AuthUser = { username, token: data.token };
      
      this.setAuthState(user);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  }

  logout(): void {
    localStorage.removeItem(this.storageKey);
    this.isAuthenticated.set(false);
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }

  private setAuthState(user: AuthUser): void {
    localStorage.setItem(this.storageKey, JSON.stringify(user));
    this.isAuthenticated.set(true);
    this.currentUser.set(user);
  }

  private checkInitialAuth(): boolean {
    return !!localStorage.getItem(this.storageKey);
  }

  private getStoredUser(): AuthUser | null {
    const stored = localStorage.getItem(this.storageKey);
    return stored ? JSON.parse(stored) : null;
  }
} 