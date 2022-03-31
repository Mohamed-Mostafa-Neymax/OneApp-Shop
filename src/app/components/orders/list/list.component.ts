import { GlobalService } from './../../../services/global.service';
import Swal  from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { OrderDetailsComponent } from '../order-details/order-details.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  ordersArr = [];
  orderType: string = 'new';
  shopName;
  
  constructor(private dialog:MatDialog, private globalService: GlobalService, private spinner:NgxSpinnerService) { }
  ngOnInit(): void {
    this.shopName = JSON.parse(localStorage.getItem(`qadiautkCurrentUser`))['data']['shop']['name_ar'];
    this.onShowOrder_Req(0);
  }

  onShowOrder_Req(status_id: number, ship_id?: number) {
    this.spinner.show();
    if( !ship_id ) {
      this.globalService.showOrdersBy_Status_id(status_id).subscribe( ordersRes => {
        this.spinner.hide();
        console.log('ordersRes', ordersRes);
        this.ordersArr = ordersRes['data'].filter( val => val?.shipment_step_id != 7 );
      });
    } else {
      this.globalService.showOrdersBy_Status_id(status_id).subscribe( ordersResFlter => {
        this.spinner.hide();
        console.log('before Filter', ordersResFlter['data']);
        if( ship_id == 2 || ship_id == 3 ) {
          this.ordersArr = ordersResFlter['data']
          .filter( val => (val?.shipment_step_id == 2 || val?.shipment_step_id == 3) && val?.shipment_step_id != 7 );
        } else {
          this.ordersArr = ordersResFlter['data'].filter( val => val?.shipment_step_id == ship_id && val?.shipment_step_id != 7 );
        }
        console.log('After Fliter', this.ordersArr);
      });
    }
  }
  
  onFilter(filterType: string, status_id: number, shipment_step_id?: number) {
    // this.ordersArr = [];
    this.orderType = filterType;
    this.onShowOrder_Req(status_id, shipment_step_id);
  }
  // appList(){
  //   this.service.allApplications().pipe(map(res=>res['data'])).subscribe(res=>{
  //     console.log('res')
  //     console.log(res)
  //     console.log(res)
  //     console.log(res)
  //   })
  // }


  onUpdateOrder(order_id: number, shipment_id: number, status_id?: number, shipmentForUpdate?: number) {
    this.spinner.show();
    this.globalService.updateOrderStatus({shop_order_id: order_id, shipment_step_id: shipment_id}).subscribe(updateRes => {
      console.log(updateRes);
      // this.ordersArr = [];
      this.onShowOrder_Req(status_id, shipmentForUpdate);
      this.spinner.hide();
        Swal.fire(
          'نجاح',
          'تم نقل الطلب بنجاح',
          'success'
        );
        this.dialog.closeAll();
    });
  }


  deleteApp(){
    Swal.fire(
      'نجاح',
      'تم حذف التطبيق بنجاح',
      'success'
      )
  }
  orderDetails(orderDetails){
    let dialogRef = this.dialog.open(OrderDetailsComponent, {
      data: orderDetails,
      height: '600px',
      width: '600px',
    });
  }
}
