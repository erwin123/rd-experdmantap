import { Component, OnInit } from '@angular/core';
import { StatemanagementService } from '../services/statemanagement.service';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLogin: boolean = false;
  traffic: boolean = false;
  constructor(private router: Router, private stateService: StatemanagementService, private loginService: LoginService) { }
  ngOnInit() {
    //this.stateService.setCurrentStateLogin();
    this.stateService.currentStateLogin.subscribe(res => { this.isLogin = res; console.log(this.isLogin) });
    // this.stateService.paramChange
    //   .subscribe(() => {
        
    //     this.stateService.currentStateLogin.subscribe(res => { this.isLogin = res; console.log(res) });
    // });

    this.stateService.currentExistTraffic.subscribe(res => {
      this.traffic = res;
    });
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/']);
  }
}
