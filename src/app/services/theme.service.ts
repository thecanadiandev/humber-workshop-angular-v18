import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly storageKey = 'theme-preference';
  isDarkMode = signal<boolean>(this.getInitialTheme());

  constructor() {
    this.applyTheme(this.isDarkMode());
  }

  toggleTheme(): void {
    this.isDarkMode.update(dark => !dark);
    this.applyTheme(this.isDarkMode());
    localStorage.setItem(this.storageKey, this.isDarkMode() ? 'dark' : 'light');
  }

  private getInitialTheme(): boolean {
    const savedTheme = localStorage.getItem(this.storageKey);
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  private applyTheme(isDark: boolean): void {
    document.documentElement.classList.toggle('dark-theme', isDark);
  }
} 