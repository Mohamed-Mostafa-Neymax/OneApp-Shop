import { GlobalService } from './../../../services/global.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  constructor( private globalService: GlobalService) { }

  ngOnInit(): void {
    this.onListNotifications();
  }

  onListNotifications() {
    this.globalService.listNotifications().subscribe( notesRes => {
      console.log('notesRes', notesRes);
    });
  }

}
