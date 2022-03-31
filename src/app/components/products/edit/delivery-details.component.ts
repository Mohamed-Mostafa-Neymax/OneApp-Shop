import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';

import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-delivery-details',
  templateUrl: './delivery-details.component.html',
  styleUrls: ['./delivery-details.component.scss']
})
export class DeliveryDetailsComponent implements OnInit {

  constructor(private dialog:MatDialog, private globalService:GlobalService, @Inject(MAT_DIALOG_DATA) public data:any, private spinner:NgxSpinnerService) { }

  editForm: FormGroup;
  priceAfterDiscount: number;
  files: any[] = [];
  image_edit = false;

  ngOnInit(): void {
    console.log(this.data);
    this.editForm = new FormGroup({
      name_ar: new FormControl(this.data.name_ar, Validators.required),
      name_en: new FormControl(this.data.name_en, Validators.required),
      description_ar: new FormControl(this.data.description_ar, Validators.required),
      description_en: new FormControl(this.data.description_en, Validators.required),
      price: new FormControl(this.data.price, Validators.required),
      discount_percent: new FormControl(this.data.discount_percent, Validators.required),
    });
  }

  onSelect(event) {
    console.log(event);
    console.log(event.addedFiles);
    console.log(event.addedFiles[0]);
    this.files=[]
    this.files.push(...event.addedFiles);
  }
  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
  formAfterEdit;
  onSubmit() {
    console.log(this.editForm.value);
    
    this.spinner.show();
    this.priceAfterDiscount = +this.editForm.value.price - (+this.editForm.value.price * (+this.editForm.value.discount_percent / 100));
    if( this.files.length > 0 ) {
      const formDate = new FormData();
      formDate.append('files[0]', this.files[0]);
      this.globalService.uploadImage(formDate).subscribe( res => {
        this.formAfterEdit = {
          ...this.editForm.value,
          shop_product_id: this.data.id,
          price_after_discount: this.priceAfterDiscount,
          has_options: this.data.has_options,
          image: res['files'][0]
        }
        this.globalService.editProduct(this.formAfterEdit).subscribe( updatedProduct => {
          this.spinner.hide();
          this.dialog.closeAll()
          console.log(updatedProduct);
        });
      });
    } else {
      this.formAfterEdit = {
        ...this.editForm.value,
        shop_product_id: this.data.id,
        price_after_discount: this.priceAfterDiscount,
        has_options: this.data.has_options,
        image: this.data.imagePath
      }
      this.globalService.editProduct(this.formAfterEdit).subscribe( updatedProduct => {
        this.spinner.hide();
        Swal.fire(
          'نجاح',
          'تم تعديل المنتج بنجاح',
          'success'
        );
        this.dialog.closeAll();
        console.log(updatedProduct);
      });
    }
    console.log(this.formAfterEdit);
  }
}
