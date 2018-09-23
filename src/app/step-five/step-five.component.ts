import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TalkthewalkService } from '../services/talkthewalk.service';
import { StatemanagementService } from '../services/statemanagement.service';
import { Talkthewalk } from '../models/talkthewalk';
import * as globalVar from '../global';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import 'rxjs/add/observable/concat';
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';

@Component({
  selector: 'app-step-five',
  templateUrl: './step-five.component.html',
  styleUrls: ['./step-five.component.css']
})
export class StepFiveComponent implements OnInit {
  empInfo: any;
  pdfSrc: string = "";
  pdfSrc2: string = "";
  pdfCode: string = "";
  pdfCode2: string = "";
  page: number = 1;
  page2: number = 1;
  totalPages: number = 0;
  totalPages2: number = 0;
  pdfBrainStorm: File = null;
  pdfSuratCinta: File = null;
  ttw: Talkthewalk;
  constructor(private toastr: ToastrService, private ttwService: TalkthewalkService
    , private stateService: StatemanagementService, private _scrollToService: ScrollToService) { }

  ngOnInit() {
    this.stateService.setTraffic(true);
    this.empInfo = this.stateService.getStoredEmployee();
    this.ttwService.getTtw(this.empInfo.BranchCode, this.empInfo.ProjectCode, 1).subscribe(res => {
      if (res) {
        this.pdfSrc = globalVar.storagePdf + res.URLpath;
        this.pdfCode = res.KdTalkTheWalk;
        console.log(this.pdfCode);
        this.stateService.setTraffic(false);
      }
    }, err => {
      this.pdfSrc = globalVar.storagePdf + "template.pdf";
      this.stateService.setTraffic(false);
    });

    this.ttwService.getTtw(this.empInfo.BranchCode, this.empInfo.ProjectCode, 2).subscribe(res => {
      if (res) {
        this.pdfSrc2 = globalVar.storagePdf + res.URLpath;
        this.pdfCode2 = res.KdTalkTheWalk;
        console.log(this.pdfCode2);
        this.stateService.setTraffic(false);
      }
    }, err => {
      this.pdfSrc2 = globalVar.storagePdf + "suratcinta.pdf";
      this.stateService.setTraffic(false);
    });

    // var q = Observable.combineLatest(
    //   this.ttwService.getTtw(this.empInfo.BranchCode, this.empInfo.ProjectCode, 1).catch(err => {
    //     console.log("1");
    //     this.pdfSrc = globalVar.storagePdf + "template.pdf";
    //     return Observable.throw(err);
    //   }),
    //   this.ttwService.getTtw(this.empInfo.BranchCode, this.empInfo.ProjectCode, 2)).catch(err => {
    //     console.log("2");
    //     this.pdfSrc2 = globalVar.storagePdf + "suratcinta.pdf";
    //     return Observable.throw(err);
    //   });

    // var sub = q.subscribe(res => {
    //   console.log("sub");
    //   if (res[0]) {
    //     this.pdfSrc = globalVar.storagePdf + res[0].URLpath;
    //   }
    //   if (res[1]) {
    //     this.pdfSrc2 = globalVar.storagePdf + res[1].URLpath;
    //   }
    //   this.stateService.setTraffic(false);
    // }, err => {
    //   this.stateService.setTraffic(false);
    //   //this.toastr.error('', 'Terjadi kesalahan jaringan');
    // });
  }

  readUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.pdfBrainStorm = event.target.files[0];
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.pdfSrc = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  readUrl2(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.pdfSuratCinta = event.target.files[0];
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.pdfSrc2 = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  afterLoadComplete(pdfData: any) {
    this.totalPages = pdfData.numPages;
  }

  afterLoadComplete2(pdfData: any) {
    this.totalPages2 = pdfData.numPages;
  }

  public triggerScrollTo(offset: number = 0) {
    const config: ScrollToConfigOptions = {
      target: 'backtop'
    };
 
    this._scrollToService.scrollTo(config);
  }

  submit(type: number) {
    if (type == 1) {
      if (this.pdfBrainStorm == null) {
        this.toastr.warning('', 'Anda belum memilih dokumen');
        return;
      }
      this.stateService.setTraffic(true);
      this.ttwService.uploadPdf(this.pdfBrainStorm).subscribe(event => {

        if (event.type === HttpEventType.UploadProgress) {
          console.log('hit');
          const percentDone = Math.round(100 * event.loaded / event.total);
          if (percentDone < 95)
            this.stateService.setProgress(percentDone);
        }

        let urlPath: any;
        if (event instanceof HttpResponse) {
          this.stateService.setProgress(100);
          urlPath = event.body
          let ttw: Talkthewalk = new Talkthewalk();
          ttw.URLpath = urlPath.filename;
          ttw.BranchCode = this.empInfo.BranchCode;
          ttw.ProjectCode = this.empInfo.ProjectCode;
          ttw.TTWtype = 1;
          ttw.Username = this.empInfo.Username;
          this.ttwService.postTtw(ttw).subscribe(data => {
            this.stateService.setTraffic(false);
            this.toastr.success('', 'Dokumen berhasil tersimpan');
          }, err => {
            this.stateService.setTraffic(false);
            this.toastr.error('', 'Terjadi kesalahan jaringan');
          })
        }
      }, err => {
        this.stateService.setTraffic(false);
        this.toastr.error('', 'Terjadi kesalahan jaringan');
      });
    }

    if (type == 2) {
      if (this.pdfSuratCinta == null) {
        this.toastr.warning('', 'Anda belum memilih dokumen');
        return;
      }
      this.stateService.setTraffic(true);
      this.ttwService.uploadPdf(this.pdfSuratCinta).subscribe(event => {

        if (event.type === HttpEventType.UploadProgress) {
          console.log('hit');
          const percentDone = Math.round(100 * event.loaded / event.total);
          if (percentDone < 95)
            this.stateService.setProgress(percentDone);
        }

        let urlPath: any;
        if (event instanceof HttpResponse) {
          this.stateService.setProgress(100);
          urlPath = event.body
          let ttw: Talkthewalk = new Talkthewalk();
          ttw.URLpath = urlPath.filename;
          ttw.BranchCode = this.empInfo.BranchCode;
          ttw.ProjectCode = this.empInfo.ProjectCode;
          ttw.TTWtype = 2;
          ttw.Username = this.empInfo.Username;
          this.ttwService.postTtw(ttw).subscribe(data => {
            this.stateService.setTraffic(false);
            this.toastr.success('', 'Dokumen berhasil tersimpan');
          }, err => {
            this.stateService.setTraffic(false);
            this.toastr.error('', 'Terjadi kesalahan jaringan');
          })
        }
      }, err => {
        this.stateService.setTraffic(false);
        this.toastr.error('', 'Terjadi kesalahan jaringan');
      });
    }
  }
}
