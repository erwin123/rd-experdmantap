import { Component, OnInit } from '@angular/core';
import { StatemanagementService } from '../services/statemanagement.service';

@Component({
  selector: 'app-stepboard',
  templateUrl: './stepboard.component.html',
  styleUrls: ['./stepboard.component.css']
})
export class StepboardComponent implements OnInit {
  employeInfo:any;
  constructor(private stateService: StatemanagementService) { }

  ngOnInit() {
    this.employeInfo = this.stateService.getStoredEmployee();
  }

}
