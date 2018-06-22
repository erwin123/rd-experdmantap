import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee';
import { Roles } from '../models/roles';
import { Week } from '../models/week';
import { InitialDataService } from '../services/initial-data.service';

@Component({
  selector: 'app-step-four',
  templateUrl: './step-four.component.html',
  styleUrls: ['./step-four.component.css']
})
export class StepFourComponent implements OnInit {
  textFeedBack:string;
  roles:Roles[];
  employees:Employee[];
  allowedChars = new Set('0123456789'.split('').map(c => c.charCodeAt(0)));
  weeks:Week[];
  constructor(private initialDataService:InitialDataService) { }

  ngOnInit() {
    

    let roleApplied = ["r005", "r006", "r009"];
    let weekApplied = [1];

    this.roles = this.initialDataService.getInitiaRole()
    this.roles = this.roles.filter(
      function (e) {
        return this.indexOf(e.roleCode) >= 0;
      }, roleApplied
    );

    this.employees = this.initialDataService.getInitialEmployee();
    this.weeks = this.initialDataService.getInitialWeek();
    this.weeks = this.weeks.filter(
      function (e) {
        return this.indexOf(e.weekNum) >= 0;
      }, weekApplied
    );
  }
  check(event: KeyboardEvent) {
    console.log("hit");
    // 31 and below are control keys, don't block them.
    if (event.keyCode > 31 && !this.allowedChars.has(event.keyCode)) {
      event.preventDefault();
    }
  }
}
