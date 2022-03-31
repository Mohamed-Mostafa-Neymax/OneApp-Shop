import { AddExcelComponent } from './add-excel/add-excel.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  {path:'list', component:ListComponent, data: { title: ' قائمة المنتجات' }},
  {path:'add', component:AddComponent, data: { title: ' إضافة منتج' }},
  {path:'addproducts', component:AddExcelComponent, data: { title: 'إضافة منتجات' }},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
