import type { ProductT } from "../api/types";

export function filterProductsBySearch(products: ProductT[], search: string): ProductT[] {
  return [...products].filter((product) => product.title.toLowerCase().includes(search.toLowerCase()));
}