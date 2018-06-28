import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { StatemanagementService } from '../services/statemanagement.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Roles } from '../models/roles';
import * as globalVar from '../global'; //<==== this one

@Injectable({
  providedIn: 'root'
})
export class RoleplayService {
  private url = globalVar.global_trx;  // URL to web api
  private _headers = new HttpHeaders().set('Content-Type', 'application/json');
  private token: any;

  constructor(private httpClient: HttpClient, private stateService: StatemanagementService) { }

  getRoleActive(projectCode: string): Observable<Roles[]> {
    this.token = JSON.parse(localStorage.getItem('currentUser'));
    const headers = this._headers.append('x-access-token', this.token.token);
    return this.httpClient.get<Roles[]>(this.url + '/project_roleplay_active?prj=' + projectCode, { headers: headers })
      .map(res => {
        if (res) {
          var empInfo = this.stateService.getStoredEmployee();
          if (empInfo.RolePlay === "RL001") {
            res = res.filter(i => i.KdRoleplay !== "RL001");
          }
          localStorage.setItem('collsrolepl', JSON.stringify(res));
          return res;
        }
        throw new Error('Not Found');
      });
  }
}
