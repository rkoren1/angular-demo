import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetProducts, Product } from 'app/shared/interfaces/product.model';
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
    return this.http.delete(
      'https://dummyjson.com/products/' + productId.toString()
    );
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
  searchProducts(productName: string) {
    const params = new HttpParams().set('q', productName);
    return this.http
      .get<GetProducts>('https://dummyjson.com/products', { params })
      .pipe(map((res) => res.products));
  }
}
