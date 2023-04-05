import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from 'app/shared/interfaces/cart.model';
import { CartsService } from './carts.service';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'app-carts',
  templateUrl: './carts.component.html',
  styleUrls: ['./carts.component.scss'],
})
export class CartsComponent implements OnInit {
  popupCartId: number;
  cartsData: Cart[];
  showPopup = false;
  filteredCarts: Cart[];
  onChange$: Subject<any> = new Subject();
  constructor(private cartsService: CartsService, private router: Router) {}

  ngOnInit() {
    this.onChange$.pipe(debounceTime(300)).subscribe((res) => {
      this.startSearching(res.value);
    });
    this.bindings();
    this.cartsService.getCarts().subscribe((carts) => {
      this.cartsData = carts;
      this.filteredCarts = carts;
    });
  }
  bindings() {
    this.startSearching = this.startSearching.bind(this);
  }

  startSearching(e: number) {
    if (e === null) {
      this.filteredCarts = this.cartsData;
      return;
    }
    this.filteredCarts = this.cartsData.filter((value) => value.userId === e);
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
