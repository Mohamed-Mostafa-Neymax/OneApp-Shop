import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicesRoutingModule } from './services-routing.module';
import { ListComponent } from './list/list.component';
import { ServiceDetailsComponent } from './service-details/service-details.component';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ListComponent, ServiceDetailsComponent],
  imports: [
    CommonModule,
    ServicesRoutingModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ServicesModule { }
