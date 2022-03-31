import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeliveryDetailsComponent } from './edit/delivery-details.component';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AddExcelComponent } from './add-excel/add-excel.component';



@NgModule({
  declarations: [ListComponent, AddComponent, CompanyDetailsComponent,DeliveryDetailsComponent, AddExcelComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    NgxDropzoneModule,
    FormsModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,MatInputModule,
    NgMultiSelectDropDownModule.forRoot(),
  ]
})
export class ProductModule { }
