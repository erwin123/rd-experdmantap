import { Component, OnInit } from '@angular/core';
import { StatemanagementService } from '../services/statemanagement.service';
import { Roles } from '../models/roles';
import { RoleplayService } from '../services/roleplay.service';

@Component({
  selector: 'app-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.css']
})

export class StepOneComponent implements OnInit {

  url: string;
  loadedvideo:boolean=false;
  player: any;
  empInfo: any;
  roles: Roles[];
  optionalRolePlay: string = "";
  constructor(private stateService: StatemanagementService, private roleplayService: RoleplayService) {
  }

  ngOnInit() {
    //this.url="/assets/vid/videoplayback.mp4";
    this.optionalRolePlay = "Peran";
    // let roleApplied = ["r005", "r006", "r009"];
    // this.roles = this.initialDataServices.getInitiaRole()
    // this.roles = this.roles.filter(
    //   function (e) {
    //     return this.indexOf(e.roleCode) >= 0;
    //   }, roleApplied
    // );
    this.empInfo = this.stateService.getStoredEmployee();
    this.roles = this.stateService.getStoredRolePlay();
    if (!this.roles) {
      this.roleplayService.getRoleActive(this.empInfo.ProjectCode).subscribe((res) => {
        this.roles = res;
      });
    }
  }

  readUrl(event: any) {
    this.loadedvideo = true;
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onloadend  = (event: any) => {
        this.url = "";
        setTimeout(() => { this.url = event.target.result; this.loadedvideo = false;}, 2000);
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

}