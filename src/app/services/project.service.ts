import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as globalVar from '../global';  

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private url = globalVar.global_trx + '/project';  // URL to web api
  private _headers = new HttpHeaders().set('Content-Type', 'application/json');
  private token: any;

  constructor(private httpClient: HttpClient) { }
  getProject(): Observable<any> {
    this.token = JSON.parse(localStorage.getItem('currentUser'));
    const headers = this._headers.append('x-access-token', this.token.token);
    return this.httpClient.get(this.url, { headers: headers })
      .map(res => {
        if (res[0]) {
          return res[0];
        }
        throw new Error('Not Found');
      });
  }

  getActiveProject(empCode: string): Observable<any> {
    this.token = JSON.parse(localStorage.getItem('currentUser'));
    const headers = this._headers.append('x-access-token', this.token.token);
    return this.httpClient.get(this.url + "_active?emp=" + empCode, { headers: headers })
      .map(res => {
        if (res[0]) {
          return res[0];
        }
        throw new Error('Not Found');
      });
  }

  completeUserProject(project: any) {
    var emp = JSON.parse(localStorage.getItem('currentEmp'));
    emp.ProjectCode = project.ProjectCode;
    emp.ProjectName = project.ProjectName;
    emp.Week = project.Week;
    localStorage.setItem('currentEmp', JSON.stringify(emp))
  }
}
