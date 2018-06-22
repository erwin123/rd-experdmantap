import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hasError:boolean=false;
  constructor(private router:Router, private loginService:LoginService) { }

  ngOnInit() {
  }

  login(){
    localStorage.setItem('currentUser', '1');
    this.loginService.login();
    setTimeout(() => {
      this.router.navigate(['main/stepboard']);
    }, 100);
  }
}
