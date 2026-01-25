export interface ProductT {
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

export type CategoryT = string;

export interface CartItemT {
  product: ProductT;
  quantity: number;
}

export type SortOptionT = 'price-asc' | 'price-desc' | 'title-asc' | 'title-desc';

export interface ProductFiltersT {
  search: string;
  category: string;
  sort: SortOptionT;
}
