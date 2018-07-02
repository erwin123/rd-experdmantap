import { Component, OnInit } from '@angular/core';
import { Roles } from '../models/roles';
import { StatemanagementService } from '../services/statemanagement.service';
import { GetheardService } from '../services/getheard.service';
import { Getheard } from '../models/getheard';

@Component({
  selector: 'app-step-three',
  templateUrl: './step-three.component.html',
  styleUrls: ['./step-three.component.css']
})
export class StepThreeComponent implements OnInit {

  errorMsg: string;
  roles: Roles[];
  empInfo: any;

  getheard: Getheard[];

  currentDoDont: string;
  optionalRolePlay: string = "";
  textDodont: string = "";

  constructor(private stateService: StatemanagementService, private getheardService: GetheardService) { }

  ngOnInit() {
    this.roles = this.stateService.getStoredRolePlay();
    this.empInfo = this.stateService.getStoredEmployee();
    this.fetch();

    this.currentDoDont = "Do`s";
    this.optionalRolePlay = "Posisi";
  }

  fetch() {
    this.stateService.setTraffic(true);
    this.getheardService.getGetheard(this.empInfo.ProjectCode, this.empInfo.BranchCode).subscribe(res => {
      this.getheard = res.sort((a, b) => {
        if (a.Roleplay < b.Roleplay)
          return -1;
        if (a.Roleplay > b.Roleplay)
          return 1;
        return 0;
      });
      this.stateService.setTraffic(false);
    },error => {
      if (!error.error.auth) {
        this.stateService.redirectLogin();
      }
    });
  }

  changeDo(wordDo) {
    if (wordDo === 1)
      this.currentDoDont = "Do`s";
    else
      this.currentDoDont = "Don't`s";

  }

  addDodont() {
    
    if (this.optionalRolePlay === "Posisi") {
      this.errorMsg = "Mohon pilih Posisi";
      return false;
    }

    if (this.textDodont === "") {
      this.errorMsg = "Mohon isi deskripsi";
      return false;
    }
    this.stateService.setTraffic(true);
    let getheard: Getheard = new Getheard();
    getheard.Type = this.currentDoDont == "Do`s" ? 1 : 0;
    getheard.DetailDesc = this.textDodont;
    getheard.Username = this.empInfo.Username;
    getheard.BranchCode = this.empInfo.BranchCode;
    getheard.ProjectCode = this.empInfo.ProjectCode;
    getheard.Roleplay = this.roles.filter(i => i.RoleplayName === this.optionalRolePlay)[0].KdRoleplay;
    this.getheardService.postGetheard(getheard).subscribe(res => {
      this.errorMsg = "";
      this.textDodont = "";
      this.fetch();
      this.stateService.setTraffic(false);
    },error => {
      if (!error.error.auth) {
        this.stateService.redirectLogin();
      }
    })

  }

  removeDodont(getHeard: Getheard) {
    this.stateService.setTraffic(true);
    this.getheardService.deleteGetheard(getHeard).subscribe(res => {
      console.log(res.affectedRows);
    },
      err => {
        this.errorMsg = "Terjadi Kesalahan Sistem";
        this.stateService.setTraffic(false);
        if (!err.error.auth) {
          this.stateService.redirectLogin();
        }
      },
      () => {
        this.fetch();
        this.stateService.setTraffic(false);
      });

  }
}
