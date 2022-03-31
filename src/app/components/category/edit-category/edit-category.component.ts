import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import Swal from 'sweetalert2';
import { GlobalService } from 'src/app/services/global.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {

  categoryForm: FormGroup;

  constructor(private dialog:MatDialog, private globalService:GlobalService, @Inject(MAT_DIALOG_DATA) public data:any, private spinner:NgxSpinnerService) { }
  ngOnInit(): void {
    console.log(this.data);
    this.categoryForm = new FormGroup({
      'name_ar': new FormControl(this.data.name_ar, Validators.required),
      'name_en': new FormControl(this.data.name_en, Validators.required)
    });
  }

  onSubmit() {
    this.spinner.show();
    this.globalService.editShopCategory({...this.categoryForm.value, shop_product_category_id: this.data.id}).subscribe( editCatRes => {
      console.log(editCatRes);
      this.spinner.hide();
        Swal.fire(
          'نجاح',
          'تم تعديل المنتج بنجاح',
          'success'
        );
        this.dialog.closeAll();
    })
  }
}
