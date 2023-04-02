import { Component, OnInit } from "@angular/core";
import { CartsService } from "./carts.service";
import { Cart } from "app/shared/interfaces/cart.model";
import { Router } from "@angular/router";

@Component({
  selector: "app-carts",
  templateUrl: "./carts.component.html",
  styleUrls: ["./carts.component.scss"],
})
export class CartsComponent implements OnInit {
  cartsData: Cart[];
  constructor(private cartsService: CartsService, private router: Router) {}

  ngOnInit() {
    this.cartsService.getCarts().subscribe((carts) => (this.cartsData = carts));
  }

  cartClicked(userId: number) {
    this.router.navigate(["/user-profile/", userId]);
  }
}
