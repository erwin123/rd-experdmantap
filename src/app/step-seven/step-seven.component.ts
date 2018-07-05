import { Component, OnInit } from '@angular/core';
import { StaytuneService } from '../services/staytune.service';
import { StatemanagementService } from '../services/statemanagement.service';

@Component({
  selector: 'app-step-seven',
  templateUrl: './step-seven.component.html',
  styleUrls: ['./step-seven.component.css']
})
export class StepSevenComponent implements OnInit {
  longAnswer: string;
  empInfo: any;
  constructor(private stService: StaytuneService
    , private stateService: StatemanagementService) { }

  ngOnInit() {
    this.stateService.setTraffic(true);
    this.empInfo = this.stateService.getStoredEmployee();
    this.stService.getStaytune(this.empInfo.BranchCode, this.empInfo.ProjectCode).subscribe(res => {
      console.log(res);
      this.longAnswer = res.BranchFeedback;
      this.stateService.setTraffic(false);
    }, err => {
      this.stateService.setTraffic(false);
    });
  }


}
