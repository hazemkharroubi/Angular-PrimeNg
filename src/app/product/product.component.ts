import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { Product } from '../interfaces/product';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  displayAddModal = false;
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getListProducts();
  }

  getListProducts() {
    this.productService.getProducts().subscribe(
      (response) => {
        this.products = response;
        console.log(this.products);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  showModal() {
    this.displayAddModal = true;
  }

  hideAddModal(isClosed: boolean) {
    this.displayAddModal = !isClosed;
  }

  saveProductToList(newProduct: any) {
    this.products.unshift(newProduct);
  }
}
