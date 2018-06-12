import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-step-five',
  templateUrl: './step-five.component.html',
  styleUrls: ['./step-five.component.css']
})
export class StepFiveComponent implements OnInit {
  pdfSrc: string = '../assets/file/template.pdf';
  pdfSrc2: string = '../assets/file/suratcinta.pdf';
  page:number=1;
  page2:number=1;
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

  readUrl2(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.pdfSrc2 = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }
}
