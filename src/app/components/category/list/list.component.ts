import { EditCategoryComponent } from './../edit-category/edit-category.component';
import   Swal  from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { CategoryDetailsComponent } from '../category-details/category-details.component';
import { GlobalService } from 'src/app/services/global.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  categories=[
    {
      name:'Digital Services',
      image:'assets/images/cat1.jpeg'
    },
    {
      name:'Delivery Services',
      image:'assets/images/cat2.jpeg'
    }
  ];
  constructor(private dialog:MatDialog, private globalService:GlobalService, private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.categoryList();
  }

  categoryList() {
    this.globalService.allCategories().subscribe( categories => {
      console.log(categories['data']);
      this.categories = categories['data'];
    });
  }

  // onShowDetails(cat) {
  //   let dialogRef = this.dialog.open( CategoryDetailsComponent, {
  //     data: cat,
  //     height: '600px',
  //     width: '600px',
  //   });
  // }
  onEditCat(cat) {
    let dialogRef = this.dialog.open( EditCategoryComponent, {
      data: cat,
      height: '600px',
      width: '600px',
    });
    dialogRef.afterClosed().subscribe( res =>  this.categoryList() );
  }
  onDeleteCat(cat_id) {
    this.spinner.show();
    this.globalService.deleteShopCategory(cat_id).subscribe( deleteRes => {
      console.log(deleteRes);
      this.spinner.hide();
      Swal.fire(
        'نجاح',
        'تم حذف الفئة بنجاح',
        'success'
      )
      this.dialog.closeAll();
      this.categoryList();
    });
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
  // viewApp(category){
  //   let dialogRef = this.dialog.open(CategoryDetailsComponent, {
  //     data:category,
  //     height: '310px',
  //     width: '400px',
  //   });
  // }
}
