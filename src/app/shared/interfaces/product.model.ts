import { FormControl } from '@angular/forms';

export interface GetProducts {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface EditProductForm {
  title: FormControl<string>;
  description: FormControl<string>;
  price: FormControl<number>;
  discountPercentage: FormControl<number>;
  stock: FormControl<number>;
}
