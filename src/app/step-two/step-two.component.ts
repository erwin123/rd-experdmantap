import { Component, OnInit } from '@angular/core';
import { SOPKeys } from '../models/sopkeys';
import { InitialDataService } from '../services/initial-data.service';
import { Roles } from '../models/roles';

@Component({
  selector: 'app-step-two',
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.css']
})


export class StepTwoComponent implements  OnInit {
  sopkeys:SOPKeys[];
  roles: Roles[];
  constructor(private initialDataService:InitialDataService) {

  }
 
  
  ngOnInit() {
    this.sopkeys = this.initialDataService.getInitialSOP();
    let roleApplied = ["r005", "r006", "r007", "r009"];

    this.roles = this.initialDataService.getInitiaRole()
    this.roles = this.roles.filter(
      function (e) {
        return this.indexOf(e.roleCode) >= 0;
      }, roleApplied
    );
  }

}
