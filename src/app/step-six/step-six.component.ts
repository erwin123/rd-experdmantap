import { Component, OnInit } from '@angular/core';
import { Banner } from '../models/banner';
import { ToastrService } from 'ngx-toastr';
import { TalkthewalkService } from '../services/talkthewalk.service';
import { StatemanagementService } from '../services/statemanagement.service';
import { Talkthewalk } from '../models/talkthewalk';
import * as globalVar from '../global'; //<==== this one
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/concat';

@Component({
  selector: 'app-step-six',
  templateUrl: './step-six.component.html',
  styleUrls: ['./step-six.component.css']
})
export class StepSixComponent implements OnInit {
  empInfo: any;
  pdfSrc: string;// = '../assets/file/rewards.pdf';
  page:number=1;
  pdfRwd: File = null;
  imgRwd: File = null;
  ttw: Talkthewalk;
  imgs:Array<Banner> = new Array();
  imgsSample:Array<Banner> = new Array();
  constructor(private toastr: ToastrService, private ttwService: TalkthewalkService
    , private stateService: StatemanagementService) { }

  ngOnInit() {
    this.stateService.setTraffic(true);
    this.empInfo = this.stateService.getStoredEmployee();
    var q = Observable.forkJoin(this.ttwService.getTr(this.empInfo.BranchCode, this.empInfo.ProjectCode, 1),
      this.ttwService.getTrImg(this.empInfo.BranchCode, this.empInfo.ProjectCode, 2));

    var sub = q.subscribe(res => {
      if (res[0]) {
        this.pdfSrc = globalVar.storagePhoto + res[0].URLpath;
      }
      if (res[1]) {
        res[1].forEach(el => {
          this.imgsSample.push({BannerDesc:"", BannerPath:globalVar.storagePhoto+el.URLpath});
        });
      }
      this.stateService.setTraffic(false);
    }, err => {
      this.stateService.setTraffic(false);
      this.toastr.error('', 'Terjadi kesalahan jaringan');
    });
  }

  readUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.pdfRwd = event.target.files[0];
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.pdfSrc = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  readUrlImg(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.imgRwd = event.target.files[0];
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.imgs.push({BannerPath:event.target.result, BannerDesc:""});
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  submit(type:number){

  }
}
