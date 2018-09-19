import { Component, OnInit } from '@angular/core';
import { StatemanagementService } from '../services/statemanagement.service';
import { Branch } from '../models/users';
import { BranchService } from '../services/branch.service';

@Component({
  selector: 'app-stepboard',
  templateUrl: './stepboard.component.html',
  styleUrls: ['./stepboard.component.css']
})
export class StepboardComponent implements OnInit {
  employeInfo:any;
  opened:boolean=false;
  branches:Array<Branch>=new Array();
  sending:boolean=false;
  constructor(private stateService: StatemanagementService, private branchService:BranchService) { }

  ngOnInit() {
    this.employeInfo = this.stateService.getStoredEmployee();
  }

  onSelectBranch(){
    this.opened = true;
    this.getBranch();
  }

  getBranch(){
    this.branchService.getAllBranch().subscribe(br =>{
      this.branches = br.filter(f => f.BranchName !=='INITS').sort((a: Branch, b: Branch) => {
        if (a.BranchName < b.BranchName) {
          return -1;
        } else if (a.BranchName > b.BranchName) {
          return 1;
        } else {
          return 0;
        }
      });
    })
  }

  onSelectedBranch(param:Branch){
    this.sending = true;
    this.employeInfo.BranchName = param.BranchName;
    this.employeInfo.BranchCode = param.BranchCode;
    this.employeInfo.BranchCity = param.BranchCity;

    setTimeout(() => {
      localStorage.setItem('currentEmp', JSON.stringify(this.employeInfo));
      this.sending = false;
      this.opened = false;
    }, 1000);
  }
}
