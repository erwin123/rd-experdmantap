import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-step-seven',
  templateUrl: './step-seven.component.html',
  styleUrls: ['./step-seven.component.css']
})
export class StepSevenComponent implements OnInit {
  longAnswer:string;
  constructor() { }

  ngOnInit() {
    this.longAnswer ="Experd feedback";
  }

}