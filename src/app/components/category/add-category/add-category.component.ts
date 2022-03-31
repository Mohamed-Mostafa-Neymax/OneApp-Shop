import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { GlobalService } from 'src/app/services/global.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  categoryForm: FormGroup;
  constructor(private globalService: GlobalService,private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.categoryForm = new FormGroup({
      'name_ar': new FormControl(null, Validators.required),
      'name_en': new FormControl(null, Validators.required)
    });
  }



  onSubmit(){
    this.spinner.show();
    this.globalService.addCategory(this.categoryForm.value).subscribe( res => {
    this.spinner.hide()
    Swal.fire(
        'نجاح',
        'تم إضافة الفئة بنجاح',
        'success'
    )
    })
  }

}
