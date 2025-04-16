import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { Product } from '../interfaces/product';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  displayAddEditModal = false;
  selectedProduct: any = null;
  subscriptions: Subscription[] = [];
  pdtSubscription: Subscription = new Subscription();

  constructor(
    private productService: ProductService,
    private confirmationService: ConfirmationService,
    private msgService: MessageService,
  ) { }

  ngOnInit(): void {
    this.getListProducts();
  }

  getListProducts() {
    this.pdtSubscription = this.productService.getProducts().subscribe(
      (response) => {
        this.products = response;
        console.log(this.products);
      },
      (error) => {
        console.error(error);
      }
    );
    this.subscriptions.push(this.pdtSubscription);
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

  deleteProduct(product: Product) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this product?',
      header: 'Delete Confirmation',
      icon: 'pi pi-trash', // ✅ Icône personnalisée
      acceptLabel: 'Yes',
      rejectLabel: 'No',
      acceptButtonStyleClass: 'p-button-danger', // bouton rouge
      rejectButtonStyleClass: 'p-button-secondary',
      accept: () => {
        // Ajoute ici la logique pour supprimer le produit
        const sub = this.productService.deleteProduct(product.id).subscribe(
          (response) => {
            this.products = this.products.filter((p) => p.id !== product.id);
            this.msgService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Product deleted successfully!',
            })
          }, error => {
            this.msgService.add({
              severity: 'error',
              summary: 'Error',
              detail: error,
            });
          }
        );
        this.subscriptions.push(sub);
      }
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
