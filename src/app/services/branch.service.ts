import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as globalVar from '../global';  

@Injectable({
  providedIn: 'root'
})
export class BranchService {
  private url = globalVar.global_trx + '/branch';  // URL to web api
  private _headers = new HttpHeaders().set('Content-Type', 'application/json');
  private token: any;

  constructor(private httpClient: HttpClient) { }

  getBranch(branchCode: string): Observable<any> {
    this.token = JSON.parse(localStorage.getItem('currentUser'));
    const headers = this._headers.append('x-access-token', this.token.token);

    return this.httpClient.post(this.url + '/cr', { BranchCode: branchCode }, { headers: headers })
      .map(res => {
        if (res[0]) {
          return res[0];
        }
        throw new Error('Not Found');
      });
  }

  completeUserBranch(branch:any) {
    var emp = JSON.parse(localStorage.getItem('currentEmp'));
    emp.BranchName = branch.BranchName;
    emp.BranchCity = branch.BranchCity;
    localStorage.setItem('currentEmp', JSON.stringify(emp))
  }
}
