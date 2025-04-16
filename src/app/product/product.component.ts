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
  displayAddEditModal = false;
  selectedProduct: any = null;
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

  showAddModal() {
    this.displayAddEditModal = true;
    this.selectedProduct = null;
  }

  hideAddModal(isClosed: boolean) {
    this.displayAddEditModal = !isClosed;
  }

  saveOrUpdateProductToList(newProduct: any) {
    if (this.selectedProduct) {
      // Update existing product
      const productIndex = this.products.findIndex((product) => product.id === newProduct.id);
      this.products[productIndex] = newProduct;
    } else {
      // Add new product
      this.products.unshift(newProduct);
    }
    //this.getListProducts();
  }

  editProduct(product: Product) {
    this.displayAddEditModal = true;
    this.selectedProduct = product;
  }
}
