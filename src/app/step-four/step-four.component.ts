import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee';
import { Roles } from '../models/roles';
import { StatemanagementService } from '../services/statemanagement.service';
import { EmployeeService } from '../services/employee.service';
import { Employeewtt } from '../models/employeewtt';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-step-four',
  templateUrl: './step-four.component.html',
  styleUrls: ['./step-four.component.css']
})
export class StepFourComponent implements OnInit {
  textFeedBack: string;
  empInfo: any;
  roles: Roles[];
  employees: Employee[];
  employeeswtt: Employeewtt[];
  weeks: Array<number> = new Array();
  allowedChars = new Set('0123456789'.split('').map(c => c.charCodeAt(0)));

  constructor(private employeeService: EmployeeService, private stateService: StatemanagementService
    , private toastr: ToastrService) { }

  ngOnInit() {
    this.stateService.setTraffic(true);
    this.roles = this.stateService.getStoredRolePlay();
    this.empInfo = this.stateService.getStoredEmployee();
    this.employeeService.getEmployeeByBranch(this.empInfo.BranchCode).subscribe(res => {
      this.employees = res;
      this.employeeService.getEmployeeWtt(this.empInfo.BranchCode, this.empInfo.ProjectCode).subscribe(res => {
        this.employeeswtt = res;
        for (let i = 1; i <= this.empInfo.Week; i++) {
          this.employees.forEach(el => {
            if (this.employeeswtt.filter(j => j.Employee === el.EmployeeCode && j.Week == i).length == 0) {
              let empwtt: Employeewtt = new Employeewtt();
              empwtt.BranchCode = this.empInfo.BranchCode;
              empwtt.ProjectCode = this.empInfo.ProjectCode;
              empwtt.Employee = el.EmployeeCode;
              empwtt.Roleplay = el.RolePlay;
              empwtt.Week = i;
              empwtt.EmployeeName = el.EmployeeName;
              this.employeeswtt.push(empwtt);
            }
          });
          this.weeks.push(i);
        }
        this.stateService.setTraffic(false);
      },
      error => {
        this.stateService.setTraffic(false);
        if (!error.error.auth) {
          this.stateService.redirectLogin();
        }
      });
    });
    
  }

  check(event: KeyboardEvent) {
    console.log("hit");
    // 31 and below are control keys, don't block them.
    if (event.keyCode > 31 && !this.allowedChars.has(event.keyCode)) {
      event.preventDefault();
    }
  }

  addStar(wtt:Employeewtt)
  {
    console.log(wtt);
    this.stateService.setTraffic(true);
    wtt.Username = this.empInfo.Username;
    this.employeeService.postEmployeeByBranch(wtt).subscribe(res=>{
      this.toastr.success('','👍 Tersimpan untuk '+wtt.EmployeeName);
      this.stateService.setTraffic(false);
    },
    error => {
      this.stateService.setTraffic(false);
      if (!error.error.auth) {
        this.stateService.redirectLogin();
      }
    });
  }
}
