import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MaterialModule } from '@shared/material.module';
import { FormsModule } from '@angular/forms';
import { ProductService } from '@services/product.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    MaterialModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  private productService = inject(ProductService);
  
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