import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDeliveryComponent } from './add-delivery/add-delivery.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  {path:'add',component:AddDeliveryComponent, data: { title: ' إضافة مندوب' }},
  {path:'list',component:ListComponent, data: { title: ' قائمة المناديب' }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeliversRoutingModule { }
