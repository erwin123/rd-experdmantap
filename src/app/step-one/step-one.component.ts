import { Component, OnInit } from '@angular/core';
import { StatemanagementService } from '../services/statemanagement.service';
import { InternshipService } from '../services/internship.service';
import { Roles } from '../models/roles';
import { RoleplayService } from '../services/roleplay.service';
import { Internship } from '../models/internship';
import { Router } from '@angular/router';
import * as globalVar from '../global';

@Component({
  selector: 'app-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.css']
})

export class StepOneComponent implements OnInit {

  url: string = "";
  urlLastestVideo: string;
  roleLastest: string;
  loadedvideo: boolean = false;
  empInfo: any;
  longAnswer: string;
  roles: Roles[];
  optionalRolePlay: string = "Peran";
  fileToUpload: File = null;
  internShip: Internship;
  internShipLatest: Internship = null;
  finish: boolean = false;
  error: boolean = false;

  constructor(private stateService: StatemanagementService,
    private roleplayService: RoleplayService,
    private internshipService: InternshipService,
    private router: Router) {
  }

  ngOnInit() {
    this.stateService.setTraffic(true);
    this.longAnswer = "";
    this.empInfo = this.stateService.getStoredEmployee();
    this.roles = this.stateService.getStoredRolePlay();
    this.internshipService.getLastestInternship(this.empInfo.ProjectCode, this.empInfo.BranchCode)
      .subscribe(res => {
        if (res) {
          this.internShipLatest = res[0];
          this.urlLastestVideo = globalVar.storageIS + this.internShipLatest.UrlVideo;
          this.roleLastest = this.roles.filter(i => i.KdRoleplay == this.internShipLatest.Roleplay)[0].RoleplayName;
        }
        this.stateService.setTraffic(false);
      },
        error => {
          this.stateService.setTraffic(false);
          if (!error.error.auth) {
            this.stateService.redirectLogin();
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

  submit() {
    if (this.url == "" || this.longAnswer == "") {
      this.error = true;
      setTimeout(() => {
        this.error = false;
      }, 4000);
    }
    this.stateService.setTraffic(true);
    this.internshipService.uploadVideo(this.fileToUpload).subscribe(data => {
      this.internShip = new Internship();
      this.internShip.UrlVideo = data;
      this.internShip.BranchCode = this.empInfo.BranchCode;
      this.internShip.HighlightDesc = this.longAnswer;
      this.internShip.ProjectCode = this.empInfo.ProjectCode;
      this.internShip.Roleplay = this.roles.filter(i => i.RoleplayName === this.optionalRolePlay)[0].KdRoleplay;
      this.internShip.Username = this.empInfo.Username;
      this.internshipService.postInternship(this.internShip).subscribe(res => {
        this.finish = true;
        this.longAnswer = "";
        this.stateService.setTraffic(false);
      }, error => {
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
    });
  }

  modalClose() {
    this.router.navigate(['main/stepboard']);
  }
}