import { Component, OnInit } from '@angular/core';
import { SOPKeys } from '../models/sopkeys';
import { Roles } from '../models/roles';
import { Dodont } from '../models/dodont';
import { InitialDataService } from '../services/initial-data.service';


@Component({
  selector: 'app-step-three',
  templateUrl: './step-three.component.html',
  styleUrls: ['./step-three.component.css']
})
export class StepThreeComponent implements OnInit {

  errorMsg: string;
  items: SOPKeys[];
  roles: Roles[];
  dodonts: Dodont[];
  currentDoDont: string;
  optionalRolePlay: string = "";
  textDodont: string = "";
  constructor(private initialDataServices: InitialDataService) { }

  ngOnInit() {
    this.items = this.initialDataServices.getInitialSOP();
    let roleApplied = ["r005", "r006", "r009"];

    this.roles = this.initialDataServices.getInitiaRole()
    this.roles = this.roles.filter(
      function (e) {
        return this.indexOf(e.roleCode) >= 0;
      }, roleApplied
    );

    // this.dodonts = this.initialDataServices.getInitialDodont().sort((a, b) => {
    //   if (a.roleCode < b.roleCode)
    //     return -1;
    //   if (a.roleCode > b.roleCode)
    //     return 1;
    //   return 0;
    // });

    this.initialDataServices.currentDodonts.subscribe(res => {
      this.dodonts = res;
    });
    this.currentDoDont = "Do's";
    this.optionalRolePlay = "Posisi";
  }

  changeDo(wordDo) {
    if (wordDo === 1)
      this.currentDoDont = "Do`s";
    else
      this.currentDoDont = "Don't`s";

  }
  addDodont() {
    if (this.optionalRolePlay === "Posisi") {
      this.errorMsg = "Please select role play required";
      return false;
    }

    if (this.textDodont === "") {
      this.errorMsg = "Please fill text required";
      return false;
    }

    let dataDodont: Dodont = new Dodont();
    dataDodont.dodont = this.currentDoDont == "Do" ? true : false;
    dataDodont.text = this.textDodont;
    switch (this.optionalRolePlay) {
      case "HRD": {
        dataDodont.roleCode = "r001";
        break;
      }
      case "Vice Director": {
        dataDodont.roleCode = "r002";
        break;
      }
      case "Director": {
        dataDodont.roleCode = "r003";
        break;
      }
      case "Manager": {
        dataDodont.roleCode = "r004";
        break;
      }
      case "Security": {
        dataDodont.roleCode = "r005";
        break;
      }
      case "CS": {
        dataDodont.roleCode = "r006";
        break;
      }
      case "Staff": {
        dataDodont.roleCode = "r007";
        break;
      }
      case "Branch Manager": {
        dataDodont.roleCode = "r008";
        break;
      }
      case "Teller": {
        dataDodont.roleCode = "r009";
        break;
      }

    }
    this.initialDataServices.setDodont(dataDodont);

    console.log(this.dodonts);
  }
}
