import { Component, OnInit, AfterViewInit, OnDestroy,ViewChild, ElementRef } from '@angular/core';
import { InitialDataService } from '../services/initial-data.service';
import { Roles } from '../models/roles';
import { videojs } from 'video.js';
import { record } from 'videojs-record';
import { RecordRTC } from 'recordrtc';
import { SOPKeys } from '../models/sopkeys';

@Component({
  selector: 'app-step-two',
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.css']
})


export class StepTwoComponent implements AfterViewInit, OnInit, OnDestroy {
  player: any;
  url: string;
  longAnswer: string;
  roles: Roles[];
  optionalRolePlay: string = "";
  emotionValue: number[];
  emotionDesc: string = "Nothing";
  sopkeys: SOPKeys[];
  @ViewChild('videoSprite') elementView:ElementRef;
  constructor(private initialDataServices: InitialDataService) {

  }

  
  ngOnDestroy() {
    this.player.record().destroy();
  }
  ngAfterViewInit() {
    console.log(this.elementView.nativeElement.offsetWidth);
    this.player = videojs('myVideo', {
      // video.js options
      controls: true,
      loop: false,
      fluid: false,
      width: this.elementView.nativeElement.offsetWidth - (this.elementView.nativeElement.offsetWidth * 0.10),
      height: 185,
      plugins: {
        // videojs-record plugin options
        record: {
          image: false,
          audio: true,
          video: true,
          maxLength: 60,
          debug: true
        }
      }
    }, function () {
      videojs.log('started screen...');

    });

    this.player.on('deviceError', () => {
      console.log('device error:', this.player.deviceErrorCode);
    });
    this.player.on('error', (error) => {
      console.log('error:', error);
    });
    // user clicked the record button and started recording
    this.player.on('startRecord', () => {
      console.log('started recording!');
    });
    // user completed recording and stream is available
    this.player.on('finishRecord', () => {
      // the blob object contains the recorded data that
      // can be downloaded by the user, stored on server etc.
      console.log('finished recording: ', this.player.recordedData);
    });
  }
  ngOnInit() {
    this.optionalRolePlay = "Intership Role";
    let roleApplied = ["r005", "r006", "r009"];

    this.roles = this.initialDataServices.getInitiaRole()
    this.roles = this.roles.filter(
      function (e) {
        return this.indexOf(e.roleCode) >= 0;
      }, roleApplied
    );
    this.sopkeys = this.initialDataServices.getInitialSOP();

  }

  changeMood($event, paramSOPKey: SOPKeys) {

    this.sopkeys.forEach((element, index) => {
      if (element.SOPCode === paramSOPKey.SOPCode) {
        paramSOPKey.value = $event.target.value;
        this.sopkeys[index] = paramSOPKey;
      }
    });

    console.log($event.target.value + " Clicked!");
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