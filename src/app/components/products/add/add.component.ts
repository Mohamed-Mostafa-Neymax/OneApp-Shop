import { FormArray, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { GlobalService } from 'src/app/services/global.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  // form: FormGroup;
  signupForm: FormGroup;

  categoriesSettings = {};
  categoriesList = [];
  selectedCategories = [];

  options_type_Settings = {};
  options_type_List = [];
  selected_options_type = [];

  options_Price_type_Settings = {};
  options_Price_type_List = [];
  selected_options_Price_type = [];

  constructor(private dialog:MatDialog, private toastr: ToastrService ,private globalService: GlobalService, private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.globalService.allCategories().subscribe( categoriesRes => {
      console.log('allCategories', categoriesRes);
      this.categoriesList = categoriesRes['data'];
    });

    this.options_type_List = [{programaticValue: 1, showedValue: 'أختيار واحد'}, {programaticValue: 2, showedValue: 'عدة أختيارات'}];
    this.options_Price_type_List = [{programaticValue: 0, showedValue: 'مجاني'}, {programaticValue: 1, showedValue: 'له سعر'}];
    this.categoriesSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name_ar',
      selectAllText: 'اختيار الكل ',
      unSelectAllText: 'الغاء الاختيار',
      itemsShowLimit: 10,
      allowSearchFilter: false
    };

    this.options_type_Settings = {
      singleSelection: true,
      idField: 'programaticValue',
      textField: 'showedValue',
      // selectAllText: 'اختيار الكل ',
      unSelectAllText: 'الغاء الاختيار',
      itemsShowLimit: 10,
      allowSearchFilter: false
    };

    this.options_Price_type_Settings = {
      singleSelection: true,
      idField: 'programaticValue',
      textField: 'showedValue',
      // selectAllText: 'اختيار الكل ',
      unSelectAllText: 'الغاء الاختيار',
      itemsShowLimit: 10,
      allowSearchFilter: false
    };



    // for ( let item of this.userData?.genders ) {
    //   this.selectedItems.push({gender:item.gender,gendername:item.gendername});
    //   this.selectedItemsByIndex.push(item.gender);
    // }

    this.signupForm = new FormGroup({
      'shop_product_category_ids': new FormControl(null, Validators.required),
      'name_ar': new FormControl(null, Validators.required),
      'name_en': new FormControl(null, Validators.required),
      'description_ar': new FormControl(null, Validators.required),
      'description_en': new FormControl(null, Validators.required),
      'price': new FormControl(null, Validators.required),
      'discount_percent': new FormControl(null, Validators.required),
      'addFile': new FormArray([
        new FormGroup({
          'options_title': new FormControl(''),
          'options_type': new FormControl(''),
          'options_price_type': new FormControl(''),
          'options': new FormArray([
            new FormGroup({
              'options_choice_name_ar': new FormControl(''),
              'options_choice_name_en': new FormControl(''),
              'options_choice_description_ar': new FormControl(''),
              'options_choice_description_en': new FormControl(''),
              'options_choice_price': new FormControl(''),
            })
          ])
        })
      ]),
    });
    /*this.form = this.formbuilder.group({
      title: ['', Validators.required],
      digitalArt: this.formbuilder.array([
        this.formbuilder.group({
          name:['']
        })
      ]),
      digitalArtFiles: this.formbuilder.array([
        this.formbuilder.group({
          option_title:[''],
          option_type:[''],
          option_price_type:['']
        })
      ]),
      details: this.formbuilder.array([
        this.formbuilder.group({
          // package:['',Validators.required],
          name:[''],
        })
      ])
    });*/
    
  }

  onSelectCategory(item: any) {
    console.log(item);
    console.log(this.selectedCategories);
  }
  onSelectAllCategories(items: any) {
    console.log(items);
    console.log(this.selectedCategories);
  }


  onSelectOption_Type(item: any) {
    console.log(item);
    console.log(this.selected_options_type);
  }

  onSelectOption_Price_Type(item: any) {
    console.log(item);
    console.log(this.selected_options_Price_type);
  }

  onAddFile() {
    const fileGroup = new FormGroup({
      'options_title': new FormControl(''),
      'options_type': new FormControl(''),
      'options_price_type': new FormControl(''),
      'options': new FormArray([
        new FormGroup({
          'options_choice_name_ar': new FormControl(''),
          'options_choice_name_en': new FormControl(''),
          'options_choice_description_ar': new FormControl(''),
          'options_choice_description_en': new FormControl(''),
          'options_choice_price': new FormControl(''),
        })
      ])
    });
    this.signupForm.get('addFile')['controls'].push(fileGroup);
  }
  onDeleteFile(fileIndex: number) {
    this.signupForm.get('addFile')['controls'].splice(fileIndex, 1);
  }



  onAddOption(fileIndex: number, optionIndex: number) {
    const optionGroup = new FormGroup({
      'options_choice_name_ar': new FormControl(null),
      'options_choice_name_en': new FormControl(null),
      'options_choice_description_ar': new FormControl(null),
      'options_choice_description_en': new FormControl(null),
      'options_choice_price': new FormControl(null),
    })
    this.signupForm.get('addFile')['controls'][fileIndex].get('options')['controls'].push(optionGroup);
  }
  onDeleteOption(fileIndex: number, optionIndex: number) {
    this.signupForm.get('addFile')['controls'][fileIndex].get('options')['controls'].splice(optionIndex, 1);
  }
  files: File[] = [];
  imagesObj = {}

  onSelect(event) {
    this.files = [];
    this.files.push(...event.addedFiles);
    const formData = new FormData();
    formData.append("files[0]", this.files[0]);
    this.globalService.uploadImage(formData).subscribe( imgStringRes => {
      console.log(imgStringRes);
      this.imagesObj['image'] = imgStringRes['files'][0];
      console.log(this.imagesObj);
    });
  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
  /*get details(){
    return this.form.controls["details"] as FormArray;
  }
  get digitalArt(){
    return this.form.controls["digitalArt"] as FormArray;
  }
  get digitalArtFiles(){
    return this.form.controls["digitalArtFiles"] as FormArray;
  }*/
  /*addTime(whichDay: any){
    console.log(whichDay)
    switch(whichDay){
      case 1:
        const detailsForm = this.formbuilder.group({ name:[''] });
        this.details.push(detailsForm);
        break;
      case 4:
        const digitalForm = this.formbuilder.group({ name:[''] });
        this.digitalArt.push(digitalForm);
        break;
      case 5:
        const filesForm = this.formbuilder.group({
          option_title:[''],
          option_type:[''],
          option_price_type:['']
        });
      this.digitalArtFiles.push(filesForm);
      break;
    }
  }*/
  /*deleteTime(dayIndex: number,whichDay: any){
  switch (whichDay){
    case 1:
          this.details.removeAt(dayIndex)
    case 4:
      this.digitalArt.removeAt(dayIndex)
    break;
    case 5:
      this.digitalArtFiles.removeAt(dayIndex)
    break;
  }

}*/
  onSubmit(){
    console.log('All Files');
    console.log('signupForm', this.signupForm);
    // console.log('signupForm', this.signupForm.value);

    let basicData = {
      name_ar: this.signupForm.value.name_ar,
      name_en: this.signupForm.value.name_en,
      description_ar: this.signupForm.value.description_ar,
      description_en: this.signupForm.value.description_en,
      price: +this.signupForm.value.price,
      discount_percent: +this.signupForm.value.discount_percent > 0 ? +this.signupForm.value.discount_percent : 0,
      shop_product_category_ids: this.selectedCategories
    };
    let arrOfFiles = [];
    let arrOfOptions = [];
    let fileData = {}

    
    for( let c = 0; c < this.signupForm.get('addFile')['controls'].length; c++ ) {
      console.log(`File ${c}`, this.signupForm.get('addFile')['controls'][c]);
      fileData['options_title'] = this.signupForm.get('addFile')['controls'][c]['value']['options_title'];
      fileData['options_type'] = this.signupForm.get('addFile')['controls'][c]['value']['options_type'];
      fileData['options_price_type'] = this.signupForm.get('addFile')['controls'][c]['value']['options_price_type'];
      for( let i = 0; i < this.signupForm.get('addFile')['controls'][c].get('options')['controls'].length; i++ ) {
        arrOfOptions.push(this.signupForm.get('addFile')['controls'][c].get('options')['controls'][i]['value']);
      }
      fileData['options'] = arrOfOptions;
      console.log('fileData '+c, fileData);
      if( fileData['options_title'].length != 0 && 
        fileData['options_type'].length != 0 && 
        fileData['options_price_type'].length != 0 &&
        fileData['options'][0]['options_choice_description_ar'].length != 0 &&
        fileData['options'][0]['options_choice_description_en'].length != 0 &&
        fileData['options'][0]['options_choice_name_ar'].length != 0 &&
        fileData['options'][0]['options_choice_name_en'].length != 0 &&
        fileData['options'][0]['options_choice_price'].length != 0
        ) {
        arrOfFiles.push(fileData);
      }
      // else {
      //   this.toastr.error('برجاء حذف الملف الفارغ');
      // }
      fileData = {};
      arrOfOptions = [];
    }
    basicData['price_after_discount'] = 
    +basicData.discount_percent == 0 ? +basicData.price : +basicData.price - (+basicData.price * ( +basicData.discount_percent / 100 ));

    basicData['has_options'] = arrOfFiles.length > 0 ? 1 : 0;

    console.log('basicData', basicData);
    console.log('arrOfFiles', arrOfFiles);
    
    if( arrOfFiles.length > 0 ) {
      console.log('Object Ready to go (files)', {...basicData, ...this.imagesObj}, arrOfFiles);
      
      this.spinner.show();
      this.globalService.addProduct({...basicData, ...this.imagesObj}, arrOfFiles).subscribe( addProductRes => {
        this.spinner.hide();
        Swal.fire(
          'نجاح',
          'تم أضافة المنتج بنجاح',
          'success'
        )
        console.log(addProductRes);
      });
    } else {
      console.log('Object Ready to go (no files)', {...basicData, ...this.imagesObj});
      
      this.spinner.show();
      this.globalService.addProduct({...basicData, ...this.imagesObj}).subscribe( addProductRes => {
        this.spinner.hide();
        Swal.fire(
          'نجاح',
          'تم أضافة المنتج بنجاح',
          'success'
        );
        this.dialog.closeAll();
        console.log(addProductRes);
      });
    }
  }
}
