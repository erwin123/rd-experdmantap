import { Component, OnInit } from '@angular/core';
import { Banner } from '../models/banner';
import { ToastrService } from 'ngx-toastr';
import { TalkthewalkService } from '../services/talkthewalk.service';
import { StatemanagementService } from '../services/statemanagement.service';
import { Talkthewalk } from '../models/talkthewalk';
import * as globalVar from '../global';  
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/concat';

@Component({
  selector: 'app-step-six',
  templateUrl: './step-six.component.html',
  styleUrls: ['./step-six.component.css']
})
export class StepSixComponent implements OnInit {
  empInfo: any;
  pdfSrc: string="";// = '../assets/file/rewards.pdf';
  page: number = 1;
  pdfRwd: File = null;
  totalPages:number = 0;
  imgRwd: Array<File> = new Array();
  ttw: Talkthewalk;
  imgs: Array<Banner> = new Array();
  imgsSample: Array<Banner> = new Array();
  loadedPhoto: boolean = false;
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
          this.imgsSample.push({ BannerDesc: "", BannerPath: globalVar.storagePhoto + el.URLpath });
        });
      }
      this.stateService.setTraffic(false);
      console.log(this.pdfSrc);
    }, err => {
      this.stateService.setTraffic(false);
      
      this.pdfSrc = globalVar.storagePhoto + "rewards.pdf";
      //this.toastr.error('', 'Terjadi kesalahan jaringan');
    });
  }

  afterLoadComplete(pdfData: any) {
    this.totalPages = pdfData.numPages;
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
    this.loadedPhoto = true;
    if (event.target.files && event.target.files[0]) {
      for(let i=0 ; i < event.target.files.length ; i++)
      {
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[i]);
        reader.onload = (event: any) => {
          console.log("loaded");
          this.imgs.push({ BannerPath: event.target.result, BannerDesc: "" });
          console.log(this.imgs);
          this.loadedPhoto = false;
        }
        this.imgRwd.push(event.target.files[i]);
      }
    }
  }

  submit(type: number) {
    if (type == 1) {
      if (this.pdfRwd == null) {
        this.toastr.warning('', 'Anda belum memilih dokumen');
        return;
      }
      this.stateService.setTraffic(true);
      this.ttwService.uploadTr(this.pdfRwd).subscribe(res => {
        let tr: Talkthewalk = new Talkthewalk();
        let urlPath:any = res;
        tr.URLpath = urlPath.filename;
        tr.BranchCode = this.empInfo.BranchCode;
        tr.ProjectCode = this.empInfo.ProjectCode;
        tr.TRtype = 1;
        tr.Username = this.empInfo.Username;
        this.ttwService.postTr(tr).subscribe(data => {
          this.stateService.setTraffic(false);
          this.toastr.success('', 'Dokumen berhasil tersimpan');
        }, err => {
          this.stateService.setTraffic(false);
          this.toastr.error('', 'Terjadi kesalahan jaringan');
        })
      }, err => {
        this.stateService.setTraffic(false);
        this.toastr.error('', 'Terjadi kesalahan jaringan');
      });
    }

    if (type == 2) {
      if (this.imgRwd.length == 0) {
        this.toastr.warning('', 'Anda belum memilih photo');
        return;
      }
      this.stateService.setTraffic(true);
      var itemsProcessed = 0;
      this.imgRwd.forEach((el, index, array) => {
        this.ttwService.uploadTr(el).subscribe(res => {
          let tr: Talkthewalk = new Talkthewalk();
          let urlPath:any = res;
          tr.URLpath = urlPath.filename;
          tr.BranchCode = this.empInfo.BranchCode;
          tr.ProjectCode = this.empInfo.ProjectCode;
          tr.Username = this.empInfo.Username;
          tr.TRtype = 2;
          this.ttwService.postTr(tr).subscribe(data => {
            this.stateService.setTraffic(false);
            itemsProcessed++;
            if (itemsProcessed === array.length) {
              this.toastr.success('', 'Dokumen berhasil tersimpan');
            }
          }, err => {
            this.stateService.setTraffic(false);
            this.toastr.error('', 'Terjadi kesalahan jaringan, Hanya beberapa foto terunggah');
          })
        }, err => {
          this.stateService.setTraffic(false);
          this.toastr.error('', 'Terjadi kesalahan jaringan');
        });
      });

    }
  }
}
