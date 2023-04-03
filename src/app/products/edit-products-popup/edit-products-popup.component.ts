import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EditProductForm, Product } from 'app/shared/interfaces/product.model';
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

  form: FormGroup<EditProductForm>;

  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    this.bindings();
    this.initForm();
  }
  private initForm() {
    this.form = new FormGroup<EditProductForm>({
      title: new FormControl(this.productData.title),
      description: new FormControl(this.productData.description),
      price: new FormControl(this.productData.price),
      discountPercentage: new FormControl(this.productData.discountPercentage),
      stock: new FormControl(this.productData.stock),
    });
  }

  private bindings() {
    this.cancel = this.cancel.bind(this);
    this.close = this.close.bind(this);
    this.confirm = this.confirm.bind(this);
  }

  confirm() {
    this.productsService
      .updateProduct(this.productData.id, this.productData)
      .subscribe((res) => {
        this.confirmed.emit(true);
      });
  }

  close() {
    this.closed.emit(true);
  }
  cancel() {
    this.canceled.emit(true);
  }
}
