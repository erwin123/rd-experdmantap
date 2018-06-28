import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../services/login.service';
import { EmployeeService } from '../services/employee.service';
import { BranchService } from '../services/branch.service';
import { ProjectService } from '../services/project.service';
import { RoleplayService } from '../services/roleplay.service';
import { StatemanagementService } from '../services/statemanagement.service';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/concat';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  lock: boolean = false;
  hasError: boolean = false;
  constructor(private router: Router, private route: ActivatedRoute,
    private loginService: LoginService, private stateService: StatemanagementService,
    private employeeService: EmployeeService, private branchService: BranchService,
    private projectService: ProjectService) { }
  username: string = "erwin.ant";
  password: string = "Sunter123";
  message: string = "";
  returnUrl: string;

  ngOnInit() {
    if (localStorage.getItem('currentUser')) {
      this.router.navigate(['/']);
    }
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    if (this.username == '' || this.password == '') {
      this.hasError = true;
      this.message = "Lengkapi Username dan Password";
      setTimeout(() => {
        this.message = "";
        this.hasError = false;;
      }, 5000);
      return;
    }
    this.stateService.setTraffic(true);
    this.lock = true;

    setTimeout(() => {
      this.loginService.login(this.username, this.password)
        .subscribe(res => {
          this.employeeService.getEmployee().subscribe(res => {
            var q = Observable.forkJoin(
              this.branchService.getBranch(res.BranchCode),
              this.projectService.getActiveProject(res.EmployeeCode)
            );
            var sub = q.subscribe(res => {
              this.branchService.completeUserBranch(res[0]);
              this.projectService.completeUserProject(res[1]);
              this.stateService.setParamChange(true);
              this.lock = false;
              this.stateService.setTraffic(false);
              this.router.navigate(['/main/stepboard']);
            },
              err => { this.handleError("Belum ada aktifitas untuk Anda"); }
            );
          },
            err => { this.handleError("Username atau Password salah"); }
          );
        },
          err => { this.handleError("Username atau Password salah"); }
        );
    }, 300);
  }

  handleError(msg:string) {
    this.message = msg;
    this.hasError = true;
    this.lock = false;
    this.stateService.setTraffic(false);
    setTimeout(() => {
      this.message = "";
      this.hasError = false;
    }, 3000);
  }
  // login() {

  //   if (this.username == '' || this.password == '') {
  //     this.hasError = true;
  //     this.message = "Lengkapi Username dan Password";
  //     setTimeout(() => {
  //       this.message = "";
  //       this.hasError = false;;
  //     }, 5000);
  //     return;
  //   }
  //   this.stateService.setTraffic(true);
  //   this.lock = true;
  //   setTimeout(() => {
  //     this.loginService.login(this.username, this.password, (res) => {
  //       if (res.status == 401 || res.status == 500) {
  //         this.message = "Terjadi kesalahan Username atau Password";
  //         this.hasError = true;
  //         this.lock = false;
  //         this.stateService.setTraffic(false);
  //         setTimeout(() => {
  //           this.message = "";
  //           this.hasError = false;
  //         }, 5000);
  //       } else {
  //         this.employeeService.getEmployee((res) => {
  //           if (res.status == 401 || res.status == 500) {
  //             this.message = "Terjadi kesalahan, coba beberapa saat lagi.";
  //             this.hasError = true;
  //             this.lock = false;
  //             this.stateService.setTraffic(false);
  //             setTimeout(() => {
  //               this.message = "";
  //               this.hasError = false;
  //             }, 5000);
  //           } else {

  //             this.stateService.setParamChange();
  //             this.lock = false;
  //             this.stateService.setTraffic(false);
  //             console.log(res);
  //             this.router.navigate(['/main/stepboard']);
  //           }
  //         });
  //         this.stateService.setParamChange();
  //         this.lock = false;
  //         this.stateService.setTraffic(false);
  //         this.router.navigate(['/main/stepboard']);
  //       }
  //     });
  //   }, 3000);
  // }
}
