import { API_URL } from "../conf/consts";
import type { CategoryT } from "./types";

export async function fetchCategories(): Promise<CategoryT[]> {
  try {
    const response = await fetch(`${API_URL}/products/categories`);
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    return response.json();
  }
  catch (error) {
    console.error('Failed to fetch categories:', error);
    throw error;
  }
}