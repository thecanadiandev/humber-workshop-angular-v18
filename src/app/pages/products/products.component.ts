import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  products = [
    {
      name: 'Product 1',
      price: 99.99,
      description: 'This is a sample product description for product 1.'
    },
    {
      name: 'Product 2',
      price: 149.99,
      description: 'This is a sample product description for product 2.'
    },
    {
      name: 'Product 3',
      price: 199.99,
      description: 'This is a sample product description for product 3.'
    }
  ];
} 