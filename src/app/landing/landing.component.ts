import { Component, OnInit } from '@angular/core';
import { Draweritems } from '../models/draweritems';
import { InitialDataService } from '../services/initial-data.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  
  items:Draweritems[];
  constructor(private initialDataService:InitialDataService) { }

  ngOnInit() {
    this.items = this.initialDataService.getInitialDrawer();
  }
 
}
