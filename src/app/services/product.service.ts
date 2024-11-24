import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, from, of, throwError } from 'rxjs';
import { map, switchMap, catchError, debounceTime, distinctUntilChanged, concatMap, tap, delay } from 'rxjs/operators';

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
  private hasLoaded = signal<boolean>(false);
  
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

  // Example 1: Using switchMap to get product details and related products
  getProductWithRelated(productId: number): Observable<{ product: Product; related: Product[] }> {
    return this.http.get<Product>(`${this.apiUrl}/products/${productId}`).pipe(
      switchMap(product => {
        // Get products in the same category
        return this.http.get<Product[]>(`${this.apiUrl}/products/category/${product.category}`).pipe(
          map(related => ({
            product,
            related: related.filter(p => p.id !== product.id)
          }))
        );
      }),
      catchError(error => throwError(() => 'Failed to fetch product and related items'))
    );
  }

  // Example 2: Using forkJoin to fetch multiple resources in parallel
  getProductAndCategories(): Observable<{ product: Product; categories: string[] }> {
    return forkJoin({
      product: this.http.get<Product>(`${this.apiUrl}/products/1`),
      categories: this.http.get<string[]>(`${this.apiUrl}/products/categories`)
    }).pipe(
      catchError(error => throwError(() => 'Failed to fetch product and categories'))
    );
  }

  // Example 3: Using concatMap for sequential API calls
  updateProductAndRefresh(productId: number, updateData: Partial<Product>): Observable<Product[]> {
    return this.http.put<Product>(`${this.apiUrl}/products/${productId}`, updateData).pipe(
      concatMap(() => this.http.get<Product[]>(`${this.apiUrl}/products`)),
      tap(products => this.products.set(products)),
      catchError(error => throwError(() => 'Failed to update and refresh products'))
    );
  }

  // Example 4: Using debounceTime and distinctUntilChanged for search
  searchProducts(searchTerm: Observable<string>): Observable<Product[]> {
    return searchTerm.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => {
        if (!term) return of([]);
        return this.http.get<Product[]>(`${this.apiUrl}/products`).pipe(
          map(products => 
            products.filter(product => 
              product.title.toLowerCase().includes(term.toLowerCase())
            )
          )
        );
      }),
      catchError(error => throwError(() => 'Failed to search products'))
    );
  }

  // Example 5: Using delay and tap for loading states
  getProductsWithDelay(delayMs: number = 1000): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products`).pipe(
      tap(() => this.isLoading.set(true)),
      delay(delayMs),
      tap(products => {
        this.products.set(products);
        this.isLoading.set(false);
      }),
      catchError(error => {
        this.error.set('Failed to fetch products');
        return throwError(() => error);
      })
    );
  }

  // Example 6: Using map and switchMap for category-based filtering with limit
  getProductsByCategory(category: string, limit: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products/category/${category}`).pipe(
      map(products => products.slice(0, limit)),
      switchMap(products => {
        const productDetails$ = products.map(p => 
          this.http.get<Product>(`${this.apiUrl}/products/${p.id}`)
        );
        return forkJoin(productDetails$);
      }),
      catchError(error => throwError(() => 'Failed to fetch category products'))
    );
  }

  async fetchProducts(): Promise<void> {
    // If products are already loaded, don't fetch again
    if (this.hasLoaded()) {
      return;
    }

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
      
      // Mark as loaded
      this.hasLoaded.set(true);
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

  // Optional: Method to force refresh products if needed
  async refreshProducts(): Promise<void> {
    this.hasLoaded.set(false);
    await this.fetchProducts();
  }
} 