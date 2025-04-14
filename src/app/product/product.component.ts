import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { Product } from '../interfaces/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private productService: ProductService) { }
  products: Product[] = [];

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
}
