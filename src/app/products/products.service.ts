import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from 'app/shared/interfaces/cart.model';
import { GetProducts } from 'app/shared/interfaces/product.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http
      .get<GetProducts>('https://dummyjson.com/products')
      .pipe(map((res) => res.products));
  }
  getProduct(productId: number) {
    return this.http.get<Product>(
      'https://dummyjson.com/product/' + productId.toString()
    );
  }
  deleteProduct(productId: number) {
    return this.http.delete('https://dummyjson.com/products/' + productId);
  }
  addProduct(productData: Product) {
    return this.http.post(
      'https://dummyjson.com/products/add',
      JSON.stringify(productData)
    );
  }
  updateProduct(productId: number, productData) {
    return this.http.put(
      'https://dummyjson.com/users/' + productId,
      JSON.stringify(productData)
    );
  }
}
