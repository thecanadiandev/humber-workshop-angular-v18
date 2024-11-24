import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://fakestoreapi.com';
  
  // Signals for state
  products = signal<Product[]>([]);
  isLoading = signal<boolean>(false);
  error = signal<string | null>(null);
  
  // Filtering and pagination signals
  searchQuery = signal<string>('');
  selectedCategory = signal<string>('');
  currentPage = signal<number>(1);
  itemsPerPage = signal<number>(6);
  categories = signal<string[]>([]);

  // Computed signals
  filteredProducts = computed(() => {
    return this.products().filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(this.searchQuery().toLowerCase());
      const matchesCategory = !this.selectedCategory() || product.category === this.selectedCategory();
      return matchesSearch && matchesCategory;
    });
  });

  paginatedProducts = computed(() => {
    const startIndex = (this.currentPage() - 1) * this.itemsPerPage();
    return this.filteredProducts().slice(startIndex, startIndex + this.itemsPerPage());
  });

  totalPages = computed(() => 
    Math.ceil(this.filteredProducts().length / this.itemsPerPage())
  );

  constructor(private http: HttpClient) {}

  async fetchProducts(): Promise<void> {
    try {
      this.isLoading.set(true);
      this.error.set(null);
      
      const response = await fetch(`${this.apiUrl}/products`);
      if (!response.ok) throw new Error('Failed to fetch products');
      
      const data: Product[] = await response.json();
      this.products.set(data);
      
      // Extract unique categories with proper typing
      const uniqueCategories = Array.from(new Set(data.map(product => product.category)));
      this.categories.set(uniqueCategories);
    } catch (err) {
      this.error.set(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      this.isLoading.set(false);
    }
  }

  setSearchQuery(query: string) {
    this.searchQuery.set(query);
    this.currentPage.set(1); // Reset to first page when searching
  }

  setCategory(category: string) {
    this.selectedCategory.set(category);
    this.currentPage.set(1); // Reset to first page when filtering
  }

  setPage(page: number) {
    this.currentPage.set(page);
  }
} 