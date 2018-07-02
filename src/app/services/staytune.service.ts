import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Staytune } from '../models/staytune';
import * as globalVar from '../global'; //<==== this one

@Injectable({
  providedIn: 'root'
})
export class StaytuneService {
  private url = globalVar.global_trx+"/st";  // URL to web api
  private _headers = new HttpHeaders().set('Content-Type', 'application/json');
  private token: any;
  constructor(private httpClient: HttpClient) { }

  getStaytune(branchCode:string,projectCode: string): Observable<Staytune> {
    this.token = JSON.parse(localStorage.getItem('currentUser'));
    const headers = this._headers.append('x-access-token', this.token.token);

    return this.httpClient.get<Staytune>(this.url+'last?br='+branchCode+'&prj='+projectCode,{ headers: headers })
      .map(res => {
        if (res[0]) {
          return res[0];
        }
        throw new Error('Not Found');
      });
  }
}
