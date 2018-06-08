import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { videojs } from 'video.js';
import { record } from 'videojs-record';
import { RecordRTC } from 'recordrtc';

@Component({
  selector: 'app-step-two',
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.css']
})


export class StepTwoComponent implements AfterViewInit, OnInit, OnDestroy {
  player: any;
  longAnswer:string;
  constructor() {

  }
  ngOnDestroy() {
    this.player.record().destroy();
  }
  ngAfterViewInit() {
    this.player = videojs('myVideo', {
      // video.js options
      controls: true,
      loop: false,
      fluid: false,
      width: window.screen.width,
      height: 240,
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

  }

}
declare var videojs: any;