import { Component, OnInit } from '@angular/core';
import { Banner } from '../models/banner';

@Component({
  selector: 'app-step-six',
  templateUrl: './step-six.component.html',
  styleUrls: ['./step-six.component.css']
})
export class StepSixComponent implements OnInit {
  pdfSrc: string = '../assets/file/rewards.pdf';

  page:number=1;

  imgs:Banner[]=[];
  imgsSample:Banner[]=[
    {BannerPath:"../assets/img/sample1.jpeg", BannerDesc:""},
    {BannerPath:"../assets/img/sample2.jpeg", BannerDesc:""},
    {BannerPath:"../assets/img/sample3.jpeg", BannerDesc:""},
    {BannerPath:"../assets/img/sample4.jpeg", BannerDesc:""}
  ]


  constructor() { }

  ngOnInit() {
  }

  readUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.pdfSrc = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  readUrlImg(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.imgs.push({BannerPath:event.target.result, BannerDesc:""});
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }
}
