import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

  orderDetailsObj;
  createdOrderDate;

  constructor(private dialog:MatDialog, @Inject(MAT_DIALOG_DATA) public data:any, private globalService: GlobalService) { }

  ngOnInit(): void {
    console.log(this.data);
    this.globalService.showOrderBy_id(this.data.id).subscribe( orderDetail => {
      console.log(orderDetail);
      this.orderDetailsObj = orderDetail['data'];
      this.createdOrderDate = new Date(this.orderDetailsObj?.created_at);
    });
  }

}
