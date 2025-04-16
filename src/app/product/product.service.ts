import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = 'https://fakestoreapi.com/products?sort=desc';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl);
  }

  addEditProduct(postData: any, selectedProduct: any) {
    if (!selectedProduct) {
      return this.http.post('https://fakestoreapi.com/products', postData)
    } else {
      return this.http.put(`https://fakestoreapi.com/products/${selectedProduct.id}`, postData)
    }
  }

  deleteProduct(productId: number) {
    return this.http.delete(`https://fakestoreapi.com/products/${productId}`)
  }
  
}
