import   Swal  from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { DeliveryDetailsComponent } from '../edit/delivery-details.component';
import { CompanyDetailsComponent } from '../company-details/company-details.component';
import { GlobalService } from 'src/app/services/global.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
products
  constructor(private dialog:MatDialog, private service: GlobalService, private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.productList()
   
  }
 
  productList(){
    this.service.getProducts().pipe(map(res=>res['data'])).subscribe(res=>{
      this.products = res;
      console.log(res);
      this.dialog.closeAll();
    })
  }



  deleteProduct(prod_id){
    this.spinner.show();
    this.service.deleteProduct(prod_id).subscribe( res =>{
      this.spinner.hide();
      Swal.fire(
        'نجاح',
        'تم حذف المنتج بنجاح',
        'success'
      );
      this.dialog.closeAll();
      this.productList();
    })
  }




  productDetalis(product){
    let dialogRef = this.dialog.open(CompanyDetailsComponent, {
      data:product,
      height: '600px',
      width: '600px',
    });
  }
  editProduct(product){
    let dialogRef = this.dialog.open( DeliveryDetailsComponent, {
      data: product,
      height: '600px',
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(res=>{
      this.productList()
      });
    

    // let specOfferID = this.categories.find( offerEle => {
    //   return offerEle.id == offer.id;
    // })
    // this.categories.splice(index, 1, specOfferID);
  }
}
