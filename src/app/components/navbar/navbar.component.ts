import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MaterialModule } from '@shared/material.module';
import { ThemeService } from '@services/theme.service';
import { AuthService } from '@services/auth.service';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    MaterialModule,
    MatTooltipModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  private themeService = inject(ThemeService);
  private authService = inject(AuthService);
  
  isDarkMode = this.themeService.isDarkMode;
  isAuthenticated = this.authService.isAuthenticated;

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  logout() {
    this.authService.logout();
  }
} 