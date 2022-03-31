import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.scss']
})
export class ServiceDetailsComponent implements OnInit {

  constructor(private dialog:MatDialog,@Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void {
    console.log('this.data')
    console.log(this.data)
    console.log(this.data)
  }

  closeCard(){
    this.dialog.closeAll()
  }
}
