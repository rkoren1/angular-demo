import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GetSingleCart } from 'app/shared/interfaces/cart.model';
import { CartsService } from '../carts.service';

@Component({
  selector: 'app-cart-products-popup',
  templateUrl: './cart-products-popup.component.html',
  styleUrls: ['./cart-products-popup.component.scss'],
})
export class CartProductsPopupComponent implements OnInit {
  @Output() closed = new EventEmitter();
  @Output() confirmed = new EventEmitter();
  @Output() canceled = new EventEmitter();
  @Input() cartId: number;
  cartData: GetSingleCart;

  constructor(private cartsService: CartsService) {}

  ngOnInit() {
    this.cartsService.getSingleCart(this.cartId).subscribe((cart) => {
      this.cartData = cart;
    });
  }

  confirm() {
    this.confirmed.emit();
  }

  close() {
    this.closed.emit();
  }
  cancel() {
    this.canceled.emit();
  }
}
