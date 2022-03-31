import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit {
  type = 'admin';
  users :any = []

  constructor(public dialog: MatDialog,private spinner:NgxSpinnerService) { }
  perPage = 6
  page = 1
  ngOnInit(): void {
    this.getUsers(this.type)
  }
  getUsers(type){
    this.type = type
    this.users.data = [
      {
        id:1,
        user_name:'mohamed elsawy',
        country_code:'+20',
        phone_number:'1097790236',
        email:'dev.eslawy@gmail.com',
      },
    ]
    // this.spinner.show()
    // this.service.list(type,`all`,this.page).pipe(map(res=>res['data'])).subscribe(response=>{
    //   this.users = response
    //   this.spinner.hide()
    // })
  }
  delete(id){
    if(confirm(`هل انت متأكد من حذف المستخدم ؟`)){
      // this.service.delete(id).subscribe(res=>{
      //   alert('تم الحذف بنجاح')
      // })
    }
  }
  updateAccountType(id,type){
    if(confirm(`هل انت متأكد من تغيير نوع الحساب الي ${type} ?`)){
      this.spinner.show()
      // this.service.updateAccountType(id,type).pipe(map(res=>res['data'])).subscribe(response=>{
      //   this.getUsers(this.type)
      //   Swal.fire(
      //     `نجاح!`,
      //     `تمت تغيير الحالة بنجاح`,
      //     `success`
      //   )
        
      //   this.spinner.hide()
      // })
    }
   
  }


  updateAccountStatus(id,type){
    if(confirm(`هل انت متأكد من تغيير حالة الحساب الي ${type} ?`)){
      this.spinner.show()
      // this.service.updateAccountStatus(id,type).pipe(map(res=>res['data'])).subscribe(response=>{
      //   this.getUsers(this.type)
      //   Swal.fire(
      //     `نجاح!`,
      //     `تمت تغيير الحالة بنجاح`,
      //     `success`
      //   )
        
      //   this.spinner.hide()
      // })
    }
   
  }


  updatePassword(userId) {
    // const dialogRef =  this.dialog.open(UpdatePasswordComponent, {
    //   data: {
    //     userId: userId
    //   }
    // });

    // dialogRef.afterClosed().subscribe(result => {
    // });
  }

}