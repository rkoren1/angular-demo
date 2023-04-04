import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from 'app/shared/interfaces/product.model';
import { DxTextBoxComponent } from 'devextreme-angular';
import { confirm } from 'devextreme/ui/dialog';
import { Subject, debounceTime } from 'rxjs';
import { ProductsService } from './products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  @ViewChild('searchBox') searchBox: DxTextBoxComponent;
  products: Product[];
  showEditPopup = false;
  editProductData: Product;
  filteredProducts: Product[];
  onChange$: Subject<any> = new Subject();
  isImgEnlarged = false;
  enlargeImgSrc: string;
  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    this.onChange$.pipe(debounceTime(300)).subscribe((res) => {
      this.startSearching(res.value);
    });
    this.startSearching = this.startSearching.bind(this);
    this.productsService.getProducts().subscribe((productsData) => {
      this.products = productsData;
      this.filteredProducts = productsData;
    });
  }

  deleteProduct(productId: number, productName: string) {
    const result = confirm(
      'Are you sure want to delete <b>' + productName + '</b>?',
      'Delete Product'
    );
    result.then((dialogResult) => {
      if (dialogResult) {
        this.productsService.deleteProduct(productId).subscribe((res) => {
          //should show toastr notification when delete is successful or false
        });
      }
    });
  }
  editProduct(productId: number) {
    this.productsService.getProduct(productId).subscribe((productData) => {
      this.editProductData = productData;
      this.showEditPopup = true;
    });
  }
  startSearching(e: string) {
    this.filteredProducts = this.products.filter((value) =>
      value.title.toLowerCase().includes(e.toLowerCase())
    );
  }

  closeEditPopup() {
    this.showEditPopup = false;
  }
  confirmEditPopup() {
    this.productsService.getProducts().subscribe((productsData) => {
      this.products = productsData;
      this.filteredProducts = productsData;
      this.searchBox.instance.reset();
      this.showEditPopup = false;
    });
  }
  enlargeImg(imgSrc: string) {
    this.enlargeImgSrc = imgSrc;
    this.isImgEnlarged = true;
  }
  closeEnlargedImg() {
    this.isImgEnlarged = false;
  }
}
