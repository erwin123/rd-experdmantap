import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as globalVar from '../global';  
import { Stdservice } from '../models/stdservice';

@Injectable({
  providedIn: 'root'
})
export class StdserviceService {
  private url = globalVar.global_trx + '/stdservice';  // URL to web api
  private _headers = new HttpHeaders().set('Content-Type', 'application/json');
  private token: any;

  constructor(private httpClient: HttpClient) { }

  postStdService(stdService:Stdservice): Observable<Stdservice> {
    let OH = "";
    if(stdService.EmployeeCode)
    {
      OH += "oh";
    }
    this.token = JSON.parse(localStorage.getItem('currentUser'));
    const headers = this._headers.append('x-access-token', this.token.token);
    return this.httpClient.post<Stdservice>(this.url+'val'+OH, stdService,{ headers: headers })
      .map(res => {
        if (res) {
          return res;
        }
        throw new Error('Not Found');
      });
  }


  postBulkStdService(stdService:Stdservice[]): Observable<any> {
    let OH = "";
    if(stdService[0].EmployeeCode)
    {
      OH += "oh";
    }
    this.token = JSON.parse(localStorage.getItem('currentUser'));
    const headers = this._headers.append('x-access-token', this.token.token);
    return this.httpClient.post<any>(this.url+'valbulk'+OH, stdService,{ headers: headers })
      .map(res => {
        if (res) {
          console.log(res);
          return res;
        }
        throw new Error('Not Found');
      });
  }

  postBulkStdServiceOH(stdService:Stdservice[]): Observable<any> {
    this.token = JSON.parse(localStorage.getItem('currentUser'));
    const headers = this._headers.append('x-access-token', this.token.token);
    return this.httpClient.post<any>(this.url+'valbulkoh', stdService,{ headers: headers })
      .map(res => {
        if (res) {
          console.log(res);
          return res;
        }
        throw new Error('Not Found');
      });
  }

  getStdService(projectCode: string): Observable<Stdservice[]> {
    this.token = JSON.parse(localStorage.getItem('currentUser'));
    const headers = this._headers.append('x-access-token', this.token.token);

    return this.httpClient.post<Stdservice[]>(this.url+'/cr', {ProjectCode : projectCode},{ headers: headers })
      .map(res => {
        if (res) {
          return res;
        }
        //throw new Error('Not Found');
      });
  }

  getStdServiceValue(branchCode:string, projectCode: string): Observable<Stdservice[]> {
    this.token = JSON.parse(localStorage.getItem('currentUser'));
    const headers = this._headers.append('x-access-token', this.token.token);

    return this.httpClient.get<Stdservice[]>(this.url+'val' + '?br='+branchCode+'&prj='+projectCode, { headers: headers })
      .map(res => {
        if (res) {
          return res;
        }
        //throw new Error('Not Found');
      });
  }

  getStdServiceValueOH(branchCode:string, projectCode: string, empCode:string): Observable<Stdservice[]> {
    this.token = JSON.parse(localStorage.getItem('currentUser'));
    const headers = this._headers.append('x-access-token', this.token.token);

    return this.httpClient.get<Stdservice[]>(this.url+'valoh' + '?br='+branchCode+'&prj='+projectCode+'&em='+empCode, { headers: headers })
      .map(res => {
        if (res) {
          return res;
        }
        //throw new Error('Not Found');
      });
  }
}
