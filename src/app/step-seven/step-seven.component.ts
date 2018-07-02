import { Component, OnInit } from '@angular/core';
import { StaytuneService } from '../services/staytune.service';
import { StatemanagementService } from '../services/statemanagement.service';
import { Staytune } from '../models/staytune';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-step-seven',
  templateUrl: './step-seven.component.html',
  styleUrls: ['./step-seven.component.css']
})
export class StepSevenComponent implements OnInit {
  longAnswer:string;
  empInfo: any;
  constructor(private toastr: ToastrService, private stService: StaytuneService
    , private stateService: StatemanagementService) { }

  ngOnInit() {
    this.stateService.setTraffic(true);
    this.empInfo = this.stateService.getStoredEmployee();
    this.stService.getStaytune(this.empInfo.BranchCode, this.empInfo.ProjectCode).subscribe(res=>{
      this.longAnswer = res.BranchFeedback;
      this.stateService.setTraffic(false);
    });
  }


}
