import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as globalVar from '../global'; //<==== this one
import { StatemanagementService } from '../services/statemanagement.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url = globalVar.global_um + '/users';  // URL to web api

  constructor(private httpClient: HttpClient, private stateService:StatemanagementService) {
  }

  login(username, password):Observable<any> {
    return this.httpClient.post(this.url + '/login', { username: username, password: password }, httpOptions)
    .map(
        res => {
          localStorage.setItem('currentUser', JSON.stringify(res));
          this.stateService.setParamChange(true);
          this.stateService.setCurrentStateLogin("1");
        }
    );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.stateService.setParamChange(true);
    this.stateService.setCurrentStateLogin("0");
  }
}
