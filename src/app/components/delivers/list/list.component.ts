import   Swal  from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { DeliveryDetailsComponent } from '../delivery-details/delivery-details.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor(private dialog:MatDialog) { }

  ngOnInit(): void {
    // this.appList()
  }

  // appList(){
  //   this.service.allApplications().pipe(map(res=>res['data'])).subscribe(res=>{
  //     console.log('res')
  //     console.log(res)
  //     console.log(res)
  //     console.log(res)
  //   })
  // }
  deleteApp(){
    Swal.fire(
      'نجاح',
      'تم حذف التطبيق بنجاح',
      'success'
      )
  }
  orderDetails(){
    let dialogRef = this.dialog.open(DeliveryDetailsComponent, {
      height: '600px',
      width: '600px',
    });
  }
}
