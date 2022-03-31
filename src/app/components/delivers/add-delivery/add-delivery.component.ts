import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { GlobalService } from 'src/app/services/global.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-add-delivery',
  templateUrl: './add-delivery.component.html',
  styleUrls: ['./add-delivery.component.scss']
})
export class AddDeliveryComponent implements OnInit {

  form:FormGroup;
  constructor(private formbuilder:FormBuilder,private service:GlobalService,private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    
  }

  files: File[] = [];

onSelect(event) {
  console.log(event.addedFiles[0]);
  this.files=[]
  this.files.push(...event.addedFiles);
}

onRemove(event) {
  console.log(event);
  this.files.splice(this.files.indexOf(event), 1);
}

  submit(){
    
  }

}
