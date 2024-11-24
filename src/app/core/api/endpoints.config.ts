export const API_ENDPOINTS = {
  products: {
    base: '/products',
    byId: (id: number) => `/products/${id}`,
    byCategory: (category: string) => `/products/category/${category}`,
    search: '/products/search'
  },
  categories: '/categories',
  users: {
    base: '/users',
    profile: '/users/profile',
    settings: '/users/settings'
  },
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    refresh: '/auth/refresh'
  }
} as const; 