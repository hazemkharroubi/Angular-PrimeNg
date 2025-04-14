import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { TableModule } from 'primeng/table';


@NgModule({
  declarations: [
    ProductComponent
  ],
  imports: [
    CommonModule,
    TableModule
  ],
  exports: [
    ProductComponent
  ],
})
export class ProductModule { }
