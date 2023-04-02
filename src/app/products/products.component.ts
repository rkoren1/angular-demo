import { Component, OnInit } from '@angular/core';
import { ProductsService } from './products.service';
import { Product } from 'app/shared/interfaces/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: Product[];
  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    this.productsService.getProducts().subscribe((productsData) => {
      this.products = productsData;
    });
  }

  deleteProduct(productId: number) {}
  editProduct(productId: number) {}
}
