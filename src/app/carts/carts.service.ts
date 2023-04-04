import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetCarts, GetSingleCart } from 'app/shared/interfaces/cart.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartsService {
  constructor(private http: HttpClient) {}

  getCarts() {
    return this.http
      .get<GetCarts>('https://dummyjson.com/carts')
      .pipe(map((res) => res.carts));
  }
  getSingleCart(cartId: number) {
    return this.http.get<GetSingleCart>(
      'https://dummyjson.com/carts/' + cartId.toString()
    );
  }
}
