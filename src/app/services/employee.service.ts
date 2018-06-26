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
  private httpOptions = {
    headers: new HttpHeaders(
      { 'Content-Type': 'application/json' }
    )
  };

  private retrievedObject = localStorage.getItem('currentUser');
  constructor(private httpClient: HttpClient) { }

  getEmployee(): Observable<any> {
    var token = JSON.parse(this.retrievedObject);
    this.httpOptions.headers.append("x-access-token", token.token);
    return this.httpClient.post(this.url + '/cr', { username: token.username }, this.httpOptions)
      .map(
        res => { console.log(res); }
      );
  }
}
