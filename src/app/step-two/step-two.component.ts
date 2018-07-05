import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { StatemanagementService } from '../services/statemanagement.service';
import { WakeupcallService } from '../services/wakeupcall.service';
import { Roles } from '../models/roles';
import { videojs } from 'video.js';
import { record } from 'videojs-record';
import { RecordRTC } from 'recordrtc';
import { Wakeupcall } from '../models/wakeupcall';
import * as globalVar from '../global';
import { StdserviceService } from '../services/stdservice.service';
import { Stdservice } from '../models/stdservice';
import { Observable } from 'rxjs/Rx';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-step-two',
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.css']
})


export class StepTwoComponent implements AfterViewInit, OnInit, OnDestroy {
  player: any;
  url: string;
  urlLast: string;
  longAnswer: string;
  loadedvideo: boolean = false;
  finish: boolean = false;
  fileToUpload: File = null;
  wakeUpCall: Wakeupcall;
  wakeUpCallLast: Wakeupcall;
  stdService: Stdservice[];
  stdServiceVal: Stdservice[];

  limit:number=900;
  videoDuration:number=0;
  empInfo: any;
  roles: Roles[];
  emotionValue: number[];
  emotionDesc: string = "Nothing";
  
  @ViewChild('videoSprite') elementView: ElementRef;
  constructor(private toastr: ToastrService,private wkCallService: WakeupcallService, private stateService: StatemanagementService,
private stdserviceService: StdserviceService) {
  }

  ngOnDestroy() {
    //this.player.record().destroy();
    this.stateService.setTraffic(true);
    this.stdserviceService.postBulkStdService(this.stdServiceVal).subscribe(res => {
      console.log(res);
      this.stateService.setTraffic(false);
    },
      error => {
        this.stateService.setTraffic(false);
        if (!error.error.auth) {
          this.stateService.redirectLogin();
        }
      })
  }
  ngAfterViewInit() {
    // console.log(this.elementView.nativeElement.offsetWidth);
    // this.player = videojs('myVideo', {
    //   // video.js options
    //   controls: true,
    //   loop: false,
    //   fluid: false,
    //   width: this.elementView.nativeElement.offsetWidth - (this.elementView.nativeElement.offsetWidth * 0.10),
    //   height: 185,
    //   plugins: {
    //     // videojs-record plugin options
    //     record: {
    //       image: false,
    //       audio: true,
    //       video: true,
    //       maxLength: 60,
    //       debug: true
    //     }
    //   }
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

  getStdValue(data: Stdservice) {
    if (this.stdServiceVal.filter(i => i.KdStdservice === data.KdStdservice)[0])
      return this.stdServiceVal.filter(i => i.KdStdservice === data.KdStdservice)[0].Value;
    return 2; //default value
  }

  ngOnInit() {
    this.stateService.setTraffic(true);
    this.longAnswer = "";
    this.empInfo = this.stateService.getStoredEmployee();
    this.roles = this.stateService.getStoredRolePlay();
    var q = Observable.forkJoin(
      this.wkCallService.getLastestWakeupcall(this.empInfo.ProjectCode, this.empInfo.BranchCode),
      this.stdserviceService.getStdService(this.empInfo.ProjectCode),
      this.stdserviceService.getStdServiceValue(this.empInfo.BranchCode, this.empInfo.ProjectCode)
    );

    q.subscribe(res => {
      if (res[0]) {
        this.wakeUpCallLast = res[0][0];
        this.urlLast = globalVar.storageWK + this.wakeUpCallLast.UrlVideo;
      }
      this.stdService = res[1];
      this.stdServiceVal = res[2];
      this.stdService.forEach(element => {
        //push default value = 2
        if (this.stdServiceVal.filter(i => i.KdStdservice === element.KdStdservice).length == 0) {
          let pushStd: Stdservice = new Stdservice();
          pushStd.BranchCode = this.empInfo.BranchCode;
          pushStd.KdStdservice = element.KdStdservice;
          pushStd.ProjectCode = element.ProjectCode;
          pushStd.Roleplay = element.Roleplay;
          pushStd.StdServiceDesc = element.StdServiceDesc;
          pushStd.Value = 2;
          this.stdServiceVal.push(pushStd);
        }
      });
      this.stateService.setTraffic(false);
    },
      err => {
        this.stateService.setTraffic(false);
        if (!err.error.auth) {
          this.stateService.redirectLogin();
        }
      });
  }

  changeMood($event, paramStdService: Stdservice) {
    this.stdServiceVal.forEach((element, index) => {
      if (element.KdStdservice === paramStdService.KdStdservice) {
        paramStdService.Value = $event.target.value;
        this.stdServiceVal[index] = paramStdService;
        this.stdserviceService.postStdService(paramStdService).subscribe(res => {
          console.log(res);
        },
          error => {
            this.stateService.setTraffic(false);
            if (!error.error.auth) {
              this.stateService.redirectLogin();
            }
          });
      }
    });
  }

  readUrl(event: any) {
    this.loadedvideo = true;
    if (event.target.files && event.target.files[0]) {
      this.fileToUpload = event.target.files[0];
      var reader = new FileReader();
      reader.onloadend = (event: any) => {
        this.url = "";
        setTimeout(() => {
          this.url = event.target.result;
          this.loadedvideo = false;
        }, 2500);
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  onMetadata(e, video) {
    console.log('metadata: ', e);
    console.log('duration: ', video.duration);
    this.videoDuration = video.duration;
  }

  submit() {
    if (this.url == "" || this.longAnswer == "") {
      this.toastr.error('', 'Video atau pesan harus diisi! ');
      return;
    }

    if (this.videoDuration > this.limit) {
      this.toastr.error('', 'Durasi video Anda melebihi batas');
      return;
    }
    
    this.stateService.setTraffic(true);
    this.wkCallService.uploadVideo(this.fileToUpload).subscribe(data => {
      this.wakeUpCall = new Wakeupcall();
      this.wakeUpCall.UrlVideo = data;
      this.wakeUpCall.BranchCode = this.empInfo.BranchCode;
      this.wakeUpCall.HighlightDesc = this.longAnswer;
      this.wakeUpCall.ProjectCode = this.empInfo.ProjectCode;
      this.wakeUpCall.Username = this.empInfo.Username;
      this.wkCallService.postWakeupcall(this.wakeUpCall).subscribe(res => {
        this.finish = true;
        this.longAnswer = "";
        this.url = "";
        this.stateService.setTraffic(false);
      },
      error => {
        this.stateService.setTraffic(false);
        if (!error.error.auth) {
          this.stateService.redirectLogin();
        }
      });
    }, error => {
      this.stateService.setTraffic(false);
      if (!error.error.auth) {
        this.stateService.redirectLogin();
      }
      console.log(error);
    });
  }

  modalClose() {
    this.finish = false;
    //this.router.navigate(['main/stepboard']);
  }
}
//declare var videojs: any;