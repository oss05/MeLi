export type Category =
  | "electronics"
  | "jewelery"
  | "men's clothing"
  | "women's clothing";

export type Rating = {
  rate: number;
  count: number;
};

export interface Product {
  category: Category;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: Rating;
  title: string;
}
