import { API_URL } from "../conf/consts";
import type { ProductT } from "./types";



export async function fetchProducts(category?: string): Promise<ProductT[]> {
  try {
    const url = category ? `${API_URL}/products/category/${category}` : `${API_URL}/products`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return response.json();
  }
  catch (error) {
    console.error('Failed to fetch products:', error);
    throw error;
  }
}
