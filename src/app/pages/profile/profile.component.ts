import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  userProfile = {
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://material.angular.io/assets/img/examples/shiba1.jpg',
    joinDate: new Date(2024, 0, 1),
    bio: 'Software developer passionate about Angular and web technologies.'
  };
} 