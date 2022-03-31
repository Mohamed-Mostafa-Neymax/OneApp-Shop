import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeliversRoutingModule } from './delivers-routing.module';
import { ListComponent } from './list/list.component';
import { DeliveryDetailsComponent } from './delivery-details/delivery-details.component';
import { AddDeliveryComponent } from './add-delivery/add-delivery.component';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';


@NgModule({
  declarations: [ListComponent, DeliveryDetailsComponent, AddDeliveryComponent],
  imports: [
    CommonModule,
    DeliversRoutingModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDropzoneModule,
  ]
})
export class DeliversModule { }
