import { Injectable, computed, inject } from '@angular/core';
import { AppStateService } from '../../core/state/app.state';
import { ApiService } from '../../core/api/api.service';
import { API_ENDPOINTS } from '../../core/api/endpoints.config';
import { withDebounce } from '../../core/utils/rxjs.utils';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private api = inject(ApiService);
  private state = inject(AppStateService);

  // Feature-specific methods
  searchProducts(query: string) {
    return this.api.get<Product[]>(API_ENDPOINTS.products.search, { params: { q: query } })
      .pipe(withDebounce());
  }

  getProductDetails(id: number) {
    return this.state.fetchData(
      `product-${id}`,
      this.api.get<Product>(API_ENDPOINTS.products.byId(id)),
      // State update logic
    );
  }
} 