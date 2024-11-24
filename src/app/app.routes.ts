import { Routes } from '@angular/router';
import { HomeComponent } from '@pages/home/home.component';
import { authGuard } from '@guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'about',
    loadComponent: () => import('@pages/about/about.component')
      .then(m => m.AboutComponent)
  },
  {
    path: 'products',
    loadComponent: () => import('@pages/products/products.component')
      .then(m => m.ProductsComponent),
    canActivate: [authGuard]
  },
  {
    path: 'products/:id',
    loadComponent: () => import('@pages/product-details/product-details.component')
      .then(m => m.ProductDetailsComponent),
    canActivate: [authGuard]
  },
  {
    path: 'rxjs-examples',
    loadComponent: () => import('@pages/rxjs-examples/rxjs-examples.component')
      .then(m => m.RxjsExamplesComponent)
  },
  {
    path: 'contact',
    loadComponent: () => import('@pages/contact/contact.component')
      .then(m => m.ContactComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('@components/login/login.component')
      .then(m => m.LoginComponent)
  },
  {
    path: 'profile',
    loadComponent: () => import('@pages/profile/profile.component')
      .then(m => m.ProfileComponent),
    canActivate: [authGuard]
  },
  { path: '**', redirectTo: '' }
];
