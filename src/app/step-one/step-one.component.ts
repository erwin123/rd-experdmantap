import { Component, OnInit } from '@angular/core';
import { StatemanagementService } from '../services/statemanagement.service';
import { InternshipService } from '../services/internship.service';
import { Roles } from '../models/roles';
import { Internship } from '../models/internship';
import { Router } from '@angular/router';
import * as globalVar from '../global';
import { ToastrService } from 'ngx-toastr';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.css']
})

export class StepOneComponent implements OnInit {

  url: string = "";
  loadedvideo: boolean = false;
  empInfo: any;
  longAnswer: string;
  roles: Roles[];
  optionalRolePlay: string = "Peran";
  fileToUpload: File = null;
  internShip: Internship;
  internShipLatest: Internship[] = new Array();
  finish: boolean = false;

  limit: number = 300;
  videoDuration: number = 0;

  constructor(private toastr: ToastrService, private stateService: StatemanagementService,
    private internshipService: InternshipService,
    private router: Router) {
  }

  ngOnInit() {
    this.stateService.setTraffic(true);
    this.longAnswer = "";
    this.empInfo = this.stateService.getStoredEmployee();
    this.roles = this.stateService.getStoredRolePlay();

    this.roles.forEach(val => {
      this.stateService.setTraffic(true);
      this.internshipService.getLastestInternshipRole(this.empInfo.ProjectCode, this.empInfo.BranchCode, val.KdRoleplay)
        .subscribe(res => {
          if (res) {
            let internShip: Internship = new Internship();
            internShip = res[0];
            internShip.UrlVideo = globalVar.storageIS + internShip.UrlVideo;
            internShip.Roleplay = this.roles.filter(i => i.KdRoleplay == res[0].Roleplay)[0].RoleplayName;
            this.internShipLatest.push(internShip);
          }
          this.stateService.setTraffic(false);
        },
          error => {
            this.stateService.setTraffic(false);
            if (!error.error.auth) {
              this.stateService.redirectLogin();
            }
          });
    });

  }

  readUrl(event: any) {
    //this.loadedvideo = true;
    if (event.target.files && event.target.files[0]) {
      this.fileToUpload = event.target.files[0];
      this.url = this.fileToUpload.name;
      // var reader = new FileReader();
      // reader.onloadend = (event: any) => {
      //   this.url = "";
      //   setTimeout(() => {
      //     this.url = event.target.result;
      //     this.loadedvideo = false;
      //   }, 2500);
      // }
      // reader.readAsDataURL(event.target.files[0]);
    }
  }

  onMetadata(e, video) {
    console.log('metadata: ', e);
    console.log('duration: ', video.duration);
    this.videoDuration = video.duration;
  }

  submit() {
    if (this.fileToUpload == null || this.longAnswer == "") {
      this.toastr.error('', 'Video atau kesan harus diisi!');
      return;
    }
    if (this.videoDuration > this.limit) {
      this.toastr.error('', 'Durasi video Anda melebihi batas');
      return;
    }
    this.stateService.setTraffic(true);
    this.internshipService.uploadVideo(this.fileToUpload).subscribe(event => {
      
      if (event.type === HttpEventType.UploadProgress) {
        
        const percentDone = Math.round(100 * event.loaded / event.total);
        if (percentDone < 95)
          this.stateService.setProgress(percentDone);
      }

      let urlVid: any;
      if (event instanceof HttpResponse) {
        this.stateService.setProgress(100);
        urlVid = event.body
        this.internShip = new Internship();
        this.internShip.UrlVideo = urlVid.filename;
        this.internShip.BranchCode = this.empInfo.BranchCode;
        this.internShip.HighlightDesc = this.longAnswer;
        this.internShip.ProjectCode = this.empInfo.ProjectCode;
        this.internShip.Roleplay = this.roles.filter(i => i.RoleplayName === this.optionalRolePlay)[0].KdRoleplay;
        this.internShip.Username = this.empInfo.Username;
        this.internshipService.postInternship(this.internShip).subscribe(res => {
          this.finish = true;
          this.longAnswer = "";
          this.stateService.setTraffic(false);
          this.stateService.setProgress(0);
        }, error => {
          this.stateService.setTraffic(false);
          if (!error.error.auth) {
            this.stateService.redirectLogin();
            this.stateService.setProgress(0);
          }
        });
      }
    }, error => {
      this.stateService.setTraffic(false);
      this.stateService.setProgress(0);
      if (!error.error.auth) {
        this.stateService.redirectLogin();
      }
    });
  }


  modalClose() {
    this.finish = false;
    //this.router.navigate(['main/stepone']);
  }
}