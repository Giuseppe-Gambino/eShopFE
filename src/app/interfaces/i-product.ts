import { iCategory } from './i-category';

export interface iProduct {
  id: number;
  name: string;
  description: string;
  titleSeconda: string;
  descriptionSeconda: string;
  titleTerza: string;
  descriptionTerza: string;
  price: number;
  resellerId: number;
  imageUrls: string[];
  category: iCategory;
  createdAt: string; // Data in formato ISO ("2025-01-28")
  priceHistory: { [date: string]: number };
}
