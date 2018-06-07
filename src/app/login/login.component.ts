import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hasError:boolean=false;
  constructor(private router:Router) { }

  ngOnInit() {
  }

  login(){
    localStorage.setItem('currentUser', '1');
    setTimeout(() => {
      this.router.navigate(['main/stepboard']);
    }, 100);
  }
}
