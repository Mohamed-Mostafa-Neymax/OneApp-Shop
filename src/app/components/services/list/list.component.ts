import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServiceDetailsComponent } from '../service-details/service-details.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  services=[
    {
      name:'Ali Kamal',
      avatar:'assets/images/user-one.jpeg',
      title:'Design Web App',
      description:'Web designers plan, create and code internet sites and web pages, many of which combine text with sounds, pictures, graphics and video clips. A web designer is responsible for creating the design and layout of a website or web pages. It and can mean working on a brand new website or updating an already existing site.',
      period:'20-30',
      price:'350',
      images:[
        'assets/images/web1.png',
        'assets/images/web2.jpeg',
        'assets/images/web3.jpeg',
      ] 
    },
    {
      name:'Shady El-3ttar',
      avatar:'assets/images/user-two.jpeg',
      title:'Design Mobile App',
      description:'Web designers plan, create and code internet sites and web pages, many of which combine text with sounds, pictures, graphics and video clips. A web designer is responsible for creating the design and layout of a website or web pages. It and can mean working on a brand new website or updating an already existing site.',
      period:'50-90',
      price:'150',
      images:[
        'assets/images/mob1.jpeg',
        'assets/images/mob2.jpeg',
        'assets/images/mob3.png',
      ]
    },
  ]
  constructor(private dialog:MatDialog,private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
  }

  // categoryList(){
  //   this.spinner.show()
  //   this.service.allCategories().pipe(map(res=>res['data'])).subscribe(res=>{
  //   this.spinner.hide()
  //   console.log('res')
  //     console.log(res)
  //     this.categories=res
  //   })
  // }


  // deleteApp(category_id){
  //   this.service.deleteCategory(category_id).subscribe(res=>{
  //     Swal.fire(
  //       'نجاح',
  //       'تم حذف الفئة بنجاح',
  //       'success'
  //       )
  //       this.categoryList()
  //   })
  // }
  viewApp(category){
    let dialogRef = this.dialog.open(ServiceDetailsComponent, {
      data:category,
      height: '700px',
      width: '800px',
    });
  }


}
