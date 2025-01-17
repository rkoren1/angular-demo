import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { CartProductsPopupComponent } from 'app/carts/cart-products-popup/cart-products-popup.component';
import { EditProductsPopupComponent } from 'app/products/edit-products-popup/edit-products-popup.component';
import { UsersComponent } from 'app/users/users.component';
import {
  DxButtonModule,
  DxFormModule,
  DxListModule,
  DxNumberBoxModule,
  DxPopupModule,
  DxTextAreaModule,
  DxTextBoxModule,
  DxTreeListModule,
} from 'devextreme-angular';
import { CartsComponent } from '../../carts/carts.component';
import { ProductsComponent } from '../../products/products.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { AdminLayoutRoutes } from './admin-layout.routing';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    DxTreeListModule,
    DxPopupModule,
    DxFormModule,
    DxTextBoxModule,
    DxButtonModule,
    DxTextAreaModule,
    DxListModule,
    DxNumberBoxModule,
  ],
  declarations: [
    UsersComponent,
    UserProfileComponent,
    CartsComponent,
    ProductsComponent,
    EditProductsPopupComponent,
    CartProductsPopupComponent,
  ],
})
export class AdminLayoutModule {}
