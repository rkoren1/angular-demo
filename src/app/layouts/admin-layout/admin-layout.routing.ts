import { Routes } from "@angular/router";
import { UserProfileComponent } from "../../user-profile/user-profile.component";
import { CartsComponent } from "../../carts/carts.component";
import { ProductsComponent } from "../../products/products.component";
import { UsersComponent } from "app/users/users.component";

export const AdminLayoutRoutes: Routes = [
  { path: "users", component: UsersComponent },
  { path: "user-profile", component: UserProfileComponent },
  { path: "carts", component: CartsComponent },
  { path: "products", component: ProductsComponent },
];
