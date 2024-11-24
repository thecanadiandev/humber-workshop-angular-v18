import { Injectable, computed, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Observable, switchMap, catchError, throwError } from 'rxjs';
import { ApiService } from '../api/api.service';
import { API_ENDPOINTS } from '../api/endpoints.config';
import { withRetry } from '../utils/rxjs.utils';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  // Loading and error states
  private loadingState = signal<{ [key: string]: boolean }>({});
  private errorState = signal<{ [key: string]: string | null }>({});

  // Data states
  private productsState = signal<Product[]>([]);
  private categoriesState = signal<string[]>([]);
  private userState = signal<User | null>(null);

  // Computed states
  readonly isLoading = computed(() => Object.values(this.loadingState()).some(Boolean));
  readonly hasErrors = computed(() => Object.values(this.errorState()).some(Boolean));

  constructor(private api: ApiService) {}

  // State management methods
  setLoading(key: string, isLoading: boolean) {
    this.loadingState.update(state => ({ ...state, [key]: isLoading }));
  }

  setError(key: string, error: string | null) {
    this.errorState.update(state => ({ ...state, [key]: error }));
  }

  // Data fetching methods with state management
  fetchData<T>(
    key: string,
    request: Observable<T>,
    stateUpdater: (data: T) => void
  ): Observable<T> {
    this.setLoading(key, true);
    this.setError(key, null);

    return request.pipe(
      withRetry(),
      switchMap(async data => {
        stateUpdater(data);
        this.setLoading(key, false);
        return data;
      }),
      catchError(error => {
        this.setLoading(key, false);
        this.setError(key, error);
        return throwError(() => error);
      })
    );
  }

  // Example usage
  loadProducts() {
    return this.fetchData(
      'products',
      this.api.get<Product[]>(API_ENDPOINTS.products.base),
      data => this.productsState.set(data)
    );
  }

  loadCategories() {
    return this.fetchData(
      'categories',
      this.api.get<string[]>(API_ENDPOINTS.categories),
      data => this.categoriesState.set(data)
    );
  }
} 