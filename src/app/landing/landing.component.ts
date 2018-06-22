import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Draweritems } from '../models/draweritems';
import { InitialDataService } from '../services/initial-data.service';

import { videojs } from 'video.js';
import { record } from 'videojs-record';
import { RecordRTC } from 'recordrtc';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  url: string;
  player: any;
  items: Draweritems[];
  constructor(private initialDataService: InitialDataService) { }
  ngOnDestroy() {
    // this.player.dispose();
  }
  ngAfterViewInit() {
    // this.player = videojs('landingVideo', {
    //   // video.js options
    //   loop: false,
    //   fluid: false,
    //   width: window.screen.width,
    //   height: 240,
    // }, function () {
    //   videojs.log('started screen...');

    // });

    // this.player.on('deviceError', () => {
    //   console.log('device error:', this.player.deviceErrorCode);
    // });
    // this.player.on('error', (error) => {
    //   console.log('error:', error);
    // });
    // // user clicked the record button and started recording
    // this.player.on('startRecord', () => {
    //   console.log('started recording!');
    // });
    // // user completed recording and stream is available
    // this.player.on('finishRecord', () => {
    //   // the blob object contains the recorded data that
    //   // can be downloaded by the user, stored on server etc.
    //   console.log('finished recording: ', this.player.recordedData);
    // });
  }

  ngOnInit() {
    // this.url = "/assets/vid/videoplayback.mp4";
    this.items = this.initialDataService.getInitialDrawer();
  }

}
declare var videojs: any;