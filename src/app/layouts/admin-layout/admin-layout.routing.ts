import { Routes } from "@angular/router";
import { UsersComponent } from "app/users/users.component";
import { CartsComponent } from "../../carts/carts.component";
import { ProductsComponent } from "../../products/products.component";
import { UserProfileComponent } from "../../user-profile/user-profile.component";

export const AdminLayoutRoutes: Routes = [
  { path: "users", component: UsersComponent },
  { path: "user-profile/:id", component: UserProfileComponent },
  { path: "carts", component: CartsComponent },
  { path: "products", component: ProductsComponent },
];
