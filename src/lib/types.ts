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
  
  export type SortOption = 'price-asc' | 'price-desc' | 'rating-desc';
  
  export interface FilterState {
    search: string;
    category: string;
    minPrice: number;
    maxPrice: number;
    sort: SortOption;
  }