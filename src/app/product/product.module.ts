import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [
    ProductComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    ButtonModule
  ],
  exports: [
    ProductComponent
  ],
})
export class ProductModule { }
