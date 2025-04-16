import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { AddEditProductModule } from './add-edit-product/add-edit-product.module';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FilterProjectComponent } from './filter-project/filter-project.component';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProductComponent,
    FilterProjectComponent,
  ],
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    AddEditProductModule,
    ConfirmDialogModule,
    DropdownModule,
    FormsModule
  ],
  exports: [
    ProductComponent
  ],
  providers: [MessageService, ConfirmationService],
})
export class ProductModule { }
