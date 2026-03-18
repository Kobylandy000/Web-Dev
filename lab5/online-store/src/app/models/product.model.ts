export interface Product {
  id: number;                // unique identifier
  name: string;              // product name
  description: string;       // short description
  price: number;             // price in KZT
  rating: number;            // 1–5 (can be decimal)
  image: string;             // негізгі сурет (ЖАҢА)
  images: string[];          // gallery images (min 3)
  link: string;              // kaspi link
  categoryId: number;        // категория ID
  likes: number;             // лайк саны
}