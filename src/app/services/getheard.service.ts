import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Getheard } from '../models/getheard';
import * as globalVar from '../global'; //<==== this one

@Injectable({
  providedIn: 'root'
})
export class GetheardService {
  private url = globalVar.global_trx+"/getheard";  // URL to web api
  private _headers = new HttpHeaders().set('Content-Type', 'application/json');
  private token: any;
  constructor(private httpClient: HttpClient) { }

  getGetheard(projectCode: string, branchCode:string): Observable<Getheard[]> {
    this.token = JSON.parse(localStorage.getItem('currentUser'));
    const headers = this._headers.append('x-access-token', this.token.token);

    return this.httpClient.post<Getheard[]>(this.url+'/cr', {ProjectCode : projectCode, BranchCode:branchCode},{ headers: headers })
      .map(res => {
        if (res) {
          return res;
        }
        throw new Error('Not Found');
      });
  }

  postGetheard(getheard:Getheard): Observable<Getheard[]> {
    this.token = JSON.parse(localStorage.getItem('currentUser'));
    const headers = this._headers.append('x-access-token', this.token.token);

    return this.httpClient.post<Getheard[]>(this.url, getheard,{ headers: headers })
      .map(res => {
        if (res) {
          return res;
        }
        throw new Error('Not Found');
      });
  }

  deleteGetheard(getheard:Getheard): Observable<any> {
    this.token = JSON.parse(localStorage.getItem('currentUser'));
    const headers = this._headers.append('x-access-token', this.token.token);

    return this.httpClient.delete(this.url+'/'+getheard.KdGetHeard,{ headers: headers })
      .map(res => {
        if (res) {
          return res;
        }
        throw new Error('Not Found');
      });
  }
}
