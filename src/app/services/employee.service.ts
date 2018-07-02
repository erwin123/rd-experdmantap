import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { Employee } from '../models/employee';
import { Employeewtt } from '../models/employeewtt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as globalVar from '../global'; //<==== this one


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private url = globalVar.global_trx + '/employee';  // URL to web api
  private _headers = new HttpHeaders().set('Content-Type', 'application/json');
  private token: any;

  constructor(private httpClient: HttpClient) { }

  getEmployee(): Observable<any> {
    this.token = JSON.parse(localStorage.getItem('currentUser'));
    const headers = this._headers.append('x-access-token', this.token.token);
    
    return this.httpClient.post(this.url + '/cr', { username: this.token.username }, { headers: headers })
      .map(res => {
        if(res[0])
        {
          localStorage.setItem('currentEmp', JSON.stringify(res[0]));
          return res[0];
        }
        throw new Error('Not Found');
      });
  }

  getEmployeeByBranch(branchCode:string): Observable<Employee[]> {
    this.token = JSON.parse(localStorage.getItem('currentUser'));
    const headers = this._headers.append('x-access-token', this.token.token);
    
    return this.httpClient.post<Employee[]>(this.url + '/cr', { BranchCode: branchCode }, { headers: headers })
      .map(res => {
        if(res)
        {
          return res;
        }
        throw new Error('Not Found');
      });
  }

  getEmployeeWtt(branchCode:string, projectCode:string): Observable<Employeewtt[]> {
    this.token = JSON.parse(localStorage.getItem('currentUser'));
    const headers = this._headers.append('x-access-token', this.token.token);
    let wtturl = globalVar.global_trx + '/wttemp';
    return this.httpClient.get<Employeewtt[]>(wtturl + '?br='+branchCode+'&prj='+projectCode, { headers: headers })
      .map(res => {
        if(res)
        {
          return res;
        }
        throw new Error('Not Found');
      });
  }

  postEmployeeByBranch(employeewtt:Employeewtt): Observable<Employeewtt> {
    this.token = JSON.parse(localStorage.getItem('currentUser'));
    const headers = this._headers.append('x-access-token', this.token.token);
    let wtturl = globalVar.global_trx + '/wtt';
    return this.httpClient.post<Employeewtt>(wtturl, employeewtt, { headers: headers })
      .map(res => {
        if(res)
        {
          return res;
        }
        throw new Error('Not Found');
      });
  }
}
