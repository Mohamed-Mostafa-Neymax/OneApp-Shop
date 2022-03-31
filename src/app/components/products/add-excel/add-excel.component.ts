import { GlobalService } from 'src/app/services/global.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-excel',
  templateUrl: './add-excel.component.html',
  styleUrls: ['./add-excel.component.scss']
})
export class AddExcelComponent implements OnInit {

  files: any[] = [];
  fileUploadForm: FormGroup;
  fileInputLabel: string;

  constructor(private service : GlobalService,private FormBuilder:FormBuilder) { }
  ngOnInit(): void {
    this.fileUploadForm=this.FormBuilder.group({
    })
  }

  onFileSelect(event) {
    let af = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel']
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(file)
      // console.log(file);
      this.files.push(file)
   
    }
  }

  onFormSubmit() {

  
    
    this.service.updateExcelFile(this.files[0]).subscribe(res=>{
      console.log(res)
    })
  }
}
