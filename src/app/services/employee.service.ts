import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
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
}
