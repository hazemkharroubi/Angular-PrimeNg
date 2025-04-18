import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../product.service';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.css']
})
export class AddEditProductComponent implements OnChanges, OnDestroy {

  @Input() displayAddEditModal: boolean = true;
  @Input() selectedProduct: any = null;
  @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() clickAddEdit: EventEmitter<any> = new EventEmitter<any>();
  modelType = "Add";
  addEditSubs: Subscription = new Subscription();


  productForm = this.fb.group({
    title: ['', [Validators.required]],
    price: [0, [Validators.required]],
    description: [''],
    category: ['', [Validators.required]],
    image: ['', [Validators.required]]
  })

  constructor(private fb: FormBuilder, private productService: ProductService, private msgService: MessageService) { }

  ngOnChanges(): void {
    if (this.selectedProduct) {
      this.modelType = "Edit";
      this.productForm.patchValue(this.selectedProduct);
    } else {
      this.productForm.reset();
      this.modelType = "Add";
    }
  }

  closeModal() {
    this.productForm.reset();
    this.clickClose.emit(true);
  }

  addEditProduct() {
    this.addEditSubs = this.productService.addEditProduct(this.productForm.value, this.selectedProduct).subscribe(
      (response) => {
        console.log(this.selectedProduct);
        const msg = this.modelType === "Add" ? 'Product added successfully!' : 'Product updated successfully!';
        this.msgService.add({ severity: 'success', summary: 'Success', detail: msg });
        this.clickAddEdit.emit(response);
        this.closeModal();
      },
      error => {
        this.msgService.add({ severity: 'error', summary: 'Error', detail: error });
        console.log('Error occured!')
      })
  }

  ngOnDestroy(): void {
    if (this.addEditSubs) {
      this.addEditSubs.unsubscribe();
    }
  }

}
