import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../product.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.css']
})
export class AddEditProductComponent {

  @Input() displayAddModal: boolean = true;
  @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() clickAdd: EventEmitter<any> = new EventEmitter<any>();

  visible: boolean = false;
  position: 'left' | 'right' | 'top' | 'bottom' | 'center' | 'topleft' | 'topright' | 'bottomleft' | 'bottomright' = 'center';

  productForm = this.fb.group({
    title: ['', [Validators.required]],
    price: [0, [Validators.required]],
    description: [''],
    category: ['', [Validators.required]],
    image: ['', [Validators.required]]
  })

  constructor(private fb: FormBuilder, private productService: ProductService, private msgService: MessageService) { }

  closeModal() {
    this.productForm.reset();
    this.clickClose.emit(true);
  }

  addProduct() {
    // Logic to add product
    console.log('Product added');
    this.productService.saveProduct(this.productForm.value).subscribe(
      (response) => {
        console.log('Product added successfully', response);
        this.msgService.add({ severity: 'success', summary: 'Success', detail: 'Product added successfully!' });
        this.clickAdd.emit(response);
        this.closeModal();
      },
      error => {
        this.msgService.add({ severity: 'error', summary: 'Rrror', detail: error });
        console.log('Error occured!')
      })
  }
  showDialog(position: 'left' | 'right' | 'top' | 'bottom' | 'center' | 'topleft' | 'topright' | 'bottomleft' | 'bottomright') {
    this.position = position;
    this.visible = true;
  }


}
