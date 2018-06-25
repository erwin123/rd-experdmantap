import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';


@Injectable({
  providedIn: 'root'
})
export class StatemanagementService {
  paramChange: EventEmitter<boolean> = new EventEmitter();
  constructor() { }

  getCurrentStateLogin(){
    if (localStorage.getItem('currentUser')) {
      return true;
    }
    return false;
  }

  getCurrentStateUser(){
    return localStorage.getItem('currentUser');
  }

  setParamChange() {
    this.paramChange.emit();
  };
}
