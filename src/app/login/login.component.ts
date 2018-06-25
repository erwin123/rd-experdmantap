import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../services/login.service';
import { StatemanagementService } from '../services/statemanagement.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hasError: boolean = false;
  loading: boolean = false;
  constructor(private router: Router, private route: ActivatedRoute,
    private loginService: LoginService, private stateService:StatemanagementService) { }
  username: string="";
  password: string="";
  message: string = "";
  returnUrl: string;
  ngOnInit() {
    if (localStorage.getItem('currentUser')) {
      this.router.navigate(['/']);
    }
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    
    if(this.username =='' || this.password =='')
    {
      this.hasError = true;
      this.message = "Lengkapi Username dan Password";
      setTimeout(() => {
        this.message = "";
        this.hasError = false;;
      }, 5000);
      return;
    }
    this.loading = true;
    setTimeout(() => {
      this.loginService.login(this.username, this.password, (res) => {
        if (res.status == 401 || res.status == 500) {
          this.message = "Terjadi kesalahan Username atau Password";
          this.loading = false;
          this.hasError = true;
          setTimeout(() => {
            this.message = "";
            this.hasError = false;;
          }, 5000);
        }else
        {
          this.stateService.setParamChange();
          this.router.navigate(['/main/stepboard']);
        }
      });
    }, 3000);
  }
}
