import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'app/shared/interfaces/product.model';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-edit-products-popup',
  templateUrl: './edit-products-popup.component.html',
  styleUrls: ['./edit-products-popup.component.scss'],
})
export class EditProductsPopupComponent implements OnInit {
  @Input() productData: Product;
  @Output() closed = new EventEmitter();
  @Output() confirmed = new EventEmitter();
  @Output() canceled = new EventEmitter();

  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    this.bindings();
  }

  confirm() {
    this.productsService
      .updateProduct(this.productData.id, this.productData)
      .subscribe((res) => {
        this.confirmed.emit();
      });
  }

  close() {
    this.closed.emit();
  }
  cancel() {
    this.canceled.emit();
  }

  private bindings() {
    this.cancel = this.cancel.bind(this);
    this.close = this.close.bind(this);
    this.confirm = this.confirm.bind(this);
  }
}
