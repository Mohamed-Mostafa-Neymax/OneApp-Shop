import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationRoutingModule } from './notification-routing.module';
import { NotificationsComponent } from './notifications/notifications.component';
import { SpecificComponent } from './specific/specific.component';


@NgModule({
  declarations: [NotificationsComponent, SpecificComponent],
  imports: [
    CommonModule,
    NotificationRoutingModule
  ]
})
export class NotificationModule { }
