import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TalkthewalkService } from '../services/talkthewalk.service';
import { StatemanagementService } from '../services/statemanagement.service';
import { Talkthewalk } from '../models/talkthewalk';
import * as globalVar from '../global'; 
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/concat';

@Component({
  selector: 'app-step-five',
  templateUrl: './step-five.component.html',
  styleUrls: ['./step-five.component.css']
})
export class StepFiveComponent implements OnInit {
  empInfo: any;
  pdfSrc: string="";
  pdfSrc2: string="";
  page: number = 1;
  page2: number = 1;
  pdfBrainStorm: File = null;
  pdfSuratCinta: File = null;
  ttw: Talkthewalk;
  constructor(private toastr: ToastrService, private ttwService: TalkthewalkService
    , private stateService: StatemanagementService) { }

  ngOnInit() {
    this.stateService.setTraffic(true);
    this.empInfo = this.stateService.getStoredEmployee();
    this.ttwService.getTtw(this.empInfo.BranchCode, this.empInfo.ProjectCode, 1).subscribe(res =>{
      if (res) {
        this.pdfSrc = globalVar.storagePdf + res.URLpath;
        this.stateService.setTraffic(false);
      }
    }, err => {
      this.pdfSrc = globalVar.storagePdf + "template.pdf";
      this.stateService.setTraffic(false);
    });

    this.ttwService.getTtw(this.empInfo.BranchCode, this.empInfo.ProjectCode, 2).subscribe(res =>{
      if (res) {
        this.pdfSrc2 = globalVar.storagePdf + res.URLpath;
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

  submit(type: number) {
    if (type == 1) {
      if (this.pdfBrainStorm == null) {
        this.toastr.warning('', 'Anda belum memilih dokumen');
        return;
      }
      this.stateService.setTraffic(true);
      this.ttwService.uploadPdf(this.pdfBrainStorm).subscribe(res => {
        let ttw: Talkthewalk = new Talkthewalk();
        ttw.URLpath = res;
        ttw.BranchCode = this.empInfo.BranchCode;
        ttw.ProjectCode = this.empInfo.ProjectCode;
        ttw.TTWtype = 1;
        this.ttwService.postTtw(ttw).subscribe(data => {
          this.stateService.setTraffic(false);
          this.toastr.success('', 'Dokumen berhasil tersimpan');
        }, err =>{
          this.stateService.setTraffic(false);
          this.toastr.error('', 'Terjadi kesalahan jaringan');
        })
      }, err =>{
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
      this.ttwService.uploadPdf(this.pdfSuratCinta).subscribe(res => {
        let ttw: Talkthewalk = new Talkthewalk();
        ttw.URLpath = res;
        ttw.BranchCode = this.empInfo.BranchCode;
        ttw.ProjectCode = this.empInfo.ProjectCode;
        ttw.TTWtype = 2;
        this.ttwService.postTtw(ttw).subscribe(data => {
          this.stateService.setTraffic(false);
          this.toastr.success('', 'Dokumen berhasil tersimpan');
        }, err =>{
          this.stateService.setTraffic(false);
          this.toastr.error('', 'Terjadi kesalahan jaringan');
        })
      }, err =>{
        this.stateService.setTraffic(false);
        this.toastr.error('', 'Terjadi kesalahan jaringan');
      });
    }
  }
}
