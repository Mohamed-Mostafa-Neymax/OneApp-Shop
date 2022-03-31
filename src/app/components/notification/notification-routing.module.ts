import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotificationsComponent } from './notifications/notifications.component';
import { SpecificComponent } from './specific/specific.component';

const routes: Routes = [
  {path:'all',component:NotificationsComponent,data:{title:'قائمة الأشعارات'}},
  // {path:'specific',component:SpecificComponent,data:{title:'إشعارات لمندوب معين'}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationRoutingModule { }
