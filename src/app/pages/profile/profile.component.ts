import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../shared/material.module';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule
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