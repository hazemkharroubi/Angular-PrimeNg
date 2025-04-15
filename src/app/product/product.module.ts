import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { AddEditProductModule } from './add-edit-product/add-edit-product.module';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    ProductComponent,
  ],
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    AddEditProductModule,
    ToastModule,
  ],
  exports: [
    ProductComponent
  ],
  providers: [MessageService],
})
export class ProductModule { }
