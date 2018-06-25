import { Component, OnInit } from '@angular/core';
import { StatemanagementService } from '../services/statemanagement.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLogin: boolean = false;
  constructor(private stateService: StatemanagementService) { }
  ngOnInit() {
    this.isLogin = this.stateService.getCurrentStateLogin();
    this.stateService.paramChange
      .subscribe(() => {
        if (localStorage.getItem('currentUser')) {
          this.isLogin = true;
        }
      });
  }

}
