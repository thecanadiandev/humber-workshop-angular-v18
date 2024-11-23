import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  template: `
    <div class="page-container">
      <h2>Our Products</h2>
      <div class="products-grid">
        <mat-card *ngFor="let product of products">
          <mat-card-header>
            <mat-card-title>{{ product.name }}</mat-card-title>
            <mat-card-subtitle>{{ product.price | currency }}</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <p>{{ product.description }}</p>
          </mat-card-content>
          <mat-card-actions>
            <button mat-button color="primary">View Details</button>
            <button mat-raised-button color="accent">Add to Cart</button>
          </mat-card-actions>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .page-container {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }
    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1rem;
      padding: 1rem 0;
    }
    mat-card {
      margin-bottom: 1rem;
    }
    mat-card-actions {
      display: flex;
      gap: 8px;
      padding: 16px;
    }
  `]
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