import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchCategories } from "./categoryService";
import { fetchProducts } from "./productService";

export const QUERY_KEYS = {
  products: (category?: string) => ['products', 'category', category ?? 'all'] as const,
  categories: ['categories'] as const,
};


export function useProducts(category?: string) {
  return useSuspenseQuery({
    queryKey: QUERY_KEYS.products(category),
    queryFn: () => fetchProducts(category),
  });
}

export function useCategories() {
  return useSuspenseQuery({
    queryKey: QUERY_KEYS.categories,
    queryFn: fetchCategories,
  });
}