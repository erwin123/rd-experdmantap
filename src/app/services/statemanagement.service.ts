import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StatemanagementService {
  paramChange: EventEmitter<boolean> = new EventEmitter();

  private existTraffic = new BehaviorSubject<boolean>(false);
  currentExistTraffic = this.existTraffic.asObservable();

  private numberProgrees = new BehaviorSubject<number>(0);
  currentNumberProgrees = this.numberProgrees.asObservable();

  private stateLogin = new BehaviorSubject<boolean>(localStorage.getItem('currentUser') ? true : false);
  currentStateLogin = this.stateLogin.asObservable();

  constructor(private router: Router) { }

  setCurrentStateLogin(val?: string) {
    if (val) {
      var state = val == "1"? true:false;
      this.stateLogin.next(state);
    }
    else {
      if (localStorage.getItem('currentUser'))
        this.stateLogin.next(true);
    }
  }

  setParamChange(val) {
    this.paramChange.emit(val);
  };

  setTraffic(existTraffic: boolean) {
    this.existTraffic.next(existTraffic);
  }

  setProgress(numberProgrees: number) {
    console.log(numberProgrees);
    this.numberProgrees.next(numberProgrees);
  }

  getStoredEmployee(){
    return JSON.parse(localStorage.getItem('currentEmp'));
  }

  getStoredRolePlay(){
    return JSON.parse(localStorage.getItem('collsrolepl'));
  }

  redirectLogin(){
    localStorage.clear();
    this.router.navigate(['main/login']);
  }
}
