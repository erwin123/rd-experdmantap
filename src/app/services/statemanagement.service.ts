import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';


@Injectable({
  providedIn: 'root'
})
export class StatemanagementService {
  paramChange: EventEmitter<boolean> = new EventEmitter();

  private existTraffic = new BehaviorSubject<boolean>(false);
  currentExistTraffic = this.existTraffic.asObservable();

  private stateLogin = new BehaviorSubject<boolean>(localStorage.getItem('currentUser') ? true : false);
  currentStateLogin = this.stateLogin.asObservable();

  constructor() { }

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

  getCurrentStateUser() {
    return localStorage.getItem('currentUser');
  }

  setParamChange(val) {
    this.paramChange.emit(val);
  };

  setTraffic(existTraffic: boolean) {
    this.existTraffic.next(existTraffic);
  }
}
