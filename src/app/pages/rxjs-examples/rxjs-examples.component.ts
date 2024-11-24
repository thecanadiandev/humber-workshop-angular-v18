import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { ProductService } from '../../services/product.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-rxjs-examples',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatExpansionModule
  ],
  templateUrl: './rxjs-examples.component.html',
  styleUrl: './rxjs-examples.component.css'
})
export class RxjsExamplesComponent implements OnInit {
  private productService = inject(ProductService);
  private destroy$ = new Subject<void>();
  
  results: { [key: string]: any } = {};

  ngOnInit() {}

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Example 1: SwitchMap
  testSwitchMap() {
    this.productService.getProductWithRelated(1)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.results['switchMap'] = data;
          console.log('SwitchMap Result:', data);
        },
        error: (err) => console.error('SwitchMap Error:', err)
      });
  }

  // Example 2: ForkJoin
  testForkJoin() {
    this.productService.getProductAndCategories()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.results['forkJoin'] = data;
          console.log('ForkJoin Result:', data);
        },
        error: (err) => console.error('ForkJoin Error:', err)
      });
  }

  // Example 3: ConcatMap
  testConcatMap() {
    this.productService.updateProductAndRefresh(1, { price: 99.99 })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.results['concatMap'] = data;
          console.log('ConcatMap Result:', data);
        },
        error: (err) => console.error('ConcatMap Error:', err)
      });
  }

  // Example 4: Search with debounceTime
  testSearch() {
    const searchTerm$ = new Subject<string>();
    this.productService.searchProducts(searchTerm$)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.results['search'] = data;
          console.log('Search Result:', data);
        },
        error: (err) => console.error('Search Error:', err)
      });

    // Simulate search terms
    searchTerm$.next('laptop');
  }

  // Example 5: Delay and Tap
  testDelayAndTap() {
    this.productService.getProductsWithDelay(2000)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.results['delay'] = data;
          console.log('Delay Result:', data);
        },
        error: (err) => console.error('Delay Error:', err)
      });
  }

  // Example 6: Category Products
  testCategoryProducts() {
    this.productService.getProductsByCategory('electronics', 3)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.results['category'] = data;
          console.log('Category Result:', data);
        },
        error: (err) => console.error('Category Error:', err)
      });
  }

  clearResults() {
    this.results = {};
  }
} 