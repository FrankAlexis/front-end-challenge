export enum ProductCategory {
  FRESH_FRUITS = "Frutas Frescas",
  CITRUS = "Cítricos",
  TROPICAL = "Tropicales",
}

export interface Product {
  id: number;
  name: string;
  category: ProductCategory;
  stock: number;
  price: number;
  tax: number;
}