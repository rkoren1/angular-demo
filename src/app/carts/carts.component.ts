import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from 'app/shared/interfaces/cart.model';
import { CartsService } from './carts.service';

@Component({
  selector: 'app-carts',
  templateUrl: './carts.component.html',
  styleUrls: ['./carts.component.scss'],
})
export class CartsComponent implements OnInit {
  popupCartId: number;
  cartsData: Cart[];
  showPopup = false;
  constructor(private cartsService: CartsService, private router: Router) {}

  ngOnInit() {
    this.cartsService.getCarts().subscribe((carts) => (this.cartsData = carts));
  }

  cartClicked(cartId: number) {
    this.popupCartId = cartId;
    this.showPopup = true;
  }
  closePopup() {
    this.showPopup = false;
  }
  popupConfirmed() {
    this.showPopup = false;
  }
}
