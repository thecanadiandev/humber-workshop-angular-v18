import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    MatButtonModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatIconModule,
    FormsModule
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  private productService = inject(ProductService);
  
  // Expose signals to template
  products = this.productService.paginatedProducts;
  filteredProducts = this.productService.filteredProducts;
  isLoading = this.productService.isLoading;
  error = this.productService.error;
  categories = this.productService.categories;
  totalPages = this.productService.totalPages;
  currentPage = this.productService.currentPage;
  searchQuery = this.productService.searchQuery;
  selectedCategory = this.productService.selectedCategory;

  ngOnInit() {
    this.productService.fetchProducts();
  }

  onSearch(query: string) {
    this.productService.setSearchQuery(query);
  }

  onCategoryChange(category: string) {
    this.productService.setCategory(category);
  }

  onPageChange(event: { pageIndex: number }) {
    this.productService.setPage(event.pageIndex + 1);
  }
} 