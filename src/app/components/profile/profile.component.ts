import { GlobalService } from 'src/app/services/global.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../auth/authentication.service';
import { NgxSpinnerService } from 'ngx-spinner';
import * as mapboxgl from 'mapbox-gl';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  signupForm!: FormGroup;

  userProfileData;
  userUpdatedProfile;

  activateInputs = false;
  activateInputsSUBJ$ = new Subject<boolean>();

  newLat = null;
  newLng = null;
  
  
  constructor(private authentication:AuthenticationService, private spinner: NgxSpinnerService, private globalService: GlobalService) {}

  ngOnInit(): void {
    this.userUpdatedProfile = localStorage.getItem(`updatedProfile`);
    if( this.userUpdatedProfile ) {
      this.userUpdatedProfile = JSON.parse(this.userUpdatedProfile);
    }
    this.authentication.currentUser.subscribe(currentUserSubject =>{
      this.userProfileData = currentUserSubject['data']['shop'];
      console.log(this.userProfileData);
      this.signupForm = new FormGroup({
        "name_ar": new FormControl(this.userProfileData['name_ar'], Validators.required),
        "name_en": new FormControl(this.userProfileData['name_en'], Validators.required),
        "description_ar": new FormControl(this.userProfileData['description_ar'], Validators.required),
        "description_en": new FormControl(this.userProfileData['description_en'], Validators.required),
        "email": new FormControl(this.userProfileData['email'], Validators.required),
        "delivery_period": new FormControl(this.userProfileData['delivery_period'])
      });
    });

    this.activateInputsSUBJ$.subscribe( showMap => {
      if( showMap ) {
        setTimeout(() => {
          let that = this;
          const map = new mapboxgl.Map({
            accessToken: 'pk.eyJ1IjoiYmFzZW0xMjEyMTk5NCIsImEiOiJja3g1dTJrYnQxYXB6MzBvMWdrcjd5MXFmIn0.YtJZRMq7vvX4T3PGiHj70Q',
            container: "mapId",
            style: "mapbox://styles/mapbox/streets-v9",
            zoom: 6,
            center: [this.userProfileData['lat'], this.userProfileData['lng']],
          });
          const marker = new mapboxgl.Marker({draggable: true}).setLngLat([this.userProfileData['lat'], this.userProfileData['lng']]).addTo(map);
          function onDragEnd() {
            const lngLat = marker.getLngLat();
            that.newLat = lngLat.lat;
            that.newLng = lngLat.lng;
            console.log(lngLat);
          }
          marker.on('dragend', onDragEnd);
        }, 500);
      }
    });
  }


  
  
  imagesObj = {}
  overallObjforRequest = {}
  files: File[] = [];
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
  

  filesCover: File[] = [];
  onSelectCover(event) {
    this.filesCover = [];
    this.filesCover.push(...event.addedFiles);
    const formData = new FormData();
      formData.append("files[0]", this.filesCover[0]);
      this.globalService.uploadImage(formData).subscribe( imgStringRes => {
        console.log(imgStringRes);
        this.imagesObj['cover_image'] = imgStringRes['files'][0];
        console.log(this.imagesObj);
      });
  }
  onRemoveCover(event) {
    console.log(event);
    this.filesCover.splice(this.filesCover.indexOf(event), 1);
  }



  onActive() {
    this.activateInputsSUBJ$.next(true);
    this.activateInputs = true;
  }

  submit() {
    if( !this.newLat && !this.newLng ) {
      this.overallObjforRequest = { ...this.signupForm.value, lat: this.userProfileData.lat, lng: this.userProfileData.lng}
      console.log('old latlng', this.overallObjforRequest);
    } else {
      this.overallObjforRequest = { ...this.signupForm.value, lat: this.newLat, lng: this.newLng }
      console.log('new latlng', this.overallObjforRequest);
    }
    console.log('imagesObj', this.imagesObj);
    console.log('overallObjforRequest', {...this.overallObjforRequest, ...this.imagesObj});
    
    this.globalService.editProfile({...this.overallObjforRequest, ...this.imagesObj}).subscribe( editProfilesRes => {
      console.log('editProfilesRes', editProfilesRes);
      localStorage.setItem(`updatedProfile`, JSON.stringify(editProfilesRes));
      this.userUpdatedProfile = localStorage.getItem(`updatedProfile`);
      if( this.userUpdatedProfile ) {
        this.userUpdatedProfile = JSON.parse(this.userUpdatedProfile);
        console.log(this.userUpdatedProfile);
      }
    });
    

    
  }
}
