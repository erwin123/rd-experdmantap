import { Component, OnInit, OnDestroy } from '@angular/core';
import { InitialDataService } from '../services/initial-data.service';
import { Roles } from '../models/roles';
import { videojs } from 'video.js';
import { record } from 'videojs-record';
import { RecordRTC } from 'recordrtc';
import { SOPKeys } from '../models/sopkeys';

@Component({
  selector: 'app-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.css']
})



export class StepOneComponent implements OnInit, OnInit, OnDestroy {
  url: string;
  player: any;
  cameraMode: boolean;
  initCamera: boolean;
  longAnswer:string;
  roles: Roles[];
  optionalRolePlay: string = "";
  emotionValue: number = 3;
  emotionDesc: string = "Nothing";
  sopkeys:SOPKeys[];
  constructor(private initialDataServices: InitialDataService) {

  }
  ngOnInit() {
    this.cameraMode = false;
    this.initCamera = false;
    this.optionalRolePlay = "Peran";
    let roleApplied = ["r005", "r006", "r009"];

    this.roles = this.initialDataServices.getInitiaRole()
    this.roles = this.roles.filter(
      function (e) {
        return this.indexOf(e.roleCode) >= 0;
      }, roleApplied
    );
    this.sopkeys = this.initialDataServices.getInitialSOP();
  }
  ngOnDestroy() {
    if (this.cameraMode)
      this.player.record().destroy();
  }

  changeMood($event) {
    this.emotionValue = $event.target.value;
    console.log($event.target.value + " Clicked!");
  }

  takePicture() {
    if (!this.cameraMode) {
      this.initCamera = true;
      this.cameraMode = true;
      setTimeout(() => {
        this.player = videojs('myPic', {
          // video.js options
          controls: true,
          loop: false,
          fluid: false,
          width: window.screen.width,
          height: 240,
          plugins: {
            // videojs-record plugin options
            record: {
              image: true,
              debug: true
            }
          }
        }, function () {
          
          videojs.log('started screen...');
          
        });
  
        // error handling
        this.player.on('deviceError', function () {
          console.warn('device error:', this.player.deviceErrorCode);
        });
        this.player.on('error', function (error) {
          console.log('error:', error);
        });
        // snapshot is available
        this.player.on('finishRecord', function () {
          // the blob object contains the image data that
          // can be downloaded by the user, stored on server etc.
          console.log('snapshot ready: ', this.player.recordedData);
        });
        this.initCamera = false;
        console.log(this.initCamera);
      }, 100);
      
    }
    else{
      this.cameraMode = false;
      this.player.record().destroy();
    }
  }
  
  readUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.url = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

}

declare var videojs: any;