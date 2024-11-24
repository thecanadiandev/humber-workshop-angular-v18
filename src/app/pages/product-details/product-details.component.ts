import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { ActivatedRoute } from '@angular/router';
import { ProductService, Product } from '../../services/product.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatChipsModule
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  private productService = inject(ProductService);
  private route = inject(ActivatedRoute);
  private destroy$ = new Subject<void>();

  product = signal<Product | null>(null);
  relatedProducts = signal<Product[]>([]);
  isLoading = signal(false);
  error = signal<string | null>(null);

  ngOnInit() {
    // Get product ID from route params
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadProductDetails(productId);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadProductDetails(productId: number) {
    this.isLoading.set(true);

    // Example 1: Using switchMap to get product and related products
    this.productService.getProductWithRelated(productId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: ({ product, related }) => {
          this.product.set(product);
          this.relatedProducts.set(related);
          this.isLoading.set(false);
        },
        error: (err) => {
          this.error.set(err);
          this.isLoading.set(false);
        }
      });

    // Example 2: Using forkJoin
    this.productService.getProductAndCategories()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          console.log('Product and categories:', data);
        },
        error: (err) => console.error('Error fetching data:', err)
      });

    // Example 3: Using concatMap
    const updateData = { price: 99.99 };
    this.productService.updateProductAndRefresh(productId, updateData)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (products) => console.log('Products updated:', products),
        error: (err) => console.error('Error updating product:', err)
      });
  }
} 