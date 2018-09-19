import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as globalVar from '../global';  
import { Aspek } from '../models/aspek';

@Injectable({
  providedIn: 'root'
})
export class AspekService {
  private url = globalVar.global_trx+"/aspekfisik";  // URL to web api
  private _headers = new HttpHeaders().set('Content-Type', 'application/json');
  private token: any;
  constructor(private httpClient: HttpClient) { }

  postAspekFisik(aspek:Aspek): Observable<Aspek> {
    let OH = "";
    if(aspek.EmployeeCode)
    {
      OH += "oh";
    }
    this.token = JSON.parse(localStorage.getItem('currentUser'));
    const headers = this._headers.append('x-access-token', this.token.token);
    return this.httpClient.post<Aspek>(this.url+'val'+OH, aspek,{ headers: headers })
      .map(res => {
        if (res) {
          return res;
        }
        throw new Error('Not Found');
      });
  }

  postBulkAspekFisik(aspek:Aspek[]): Observable<any> {
    let OH = "";
    if(aspek[0].EmployeeCode)
    {
      OH += "oh";
    }
    this.token = JSON.parse(localStorage.getItem('currentUser'));
    const headers = this._headers.append('x-access-token', this.token.token);
    return this.httpClient.post<any>(this.url+'valbulk'+OH, aspek,{ headers: headers })
      .map(res => {
        if (res) {
          console.log(res);
          return res;
        }
        throw new Error('Not Found');
      });
  }

  getAspekParent(projectCode: string): Observable<Aspek[]> {
    this.token = JSON.parse(localStorage.getItem('currentUser'));
    const headers = this._headers.append('x-access-token', this.token.token);

    return this.httpClient.post<Aspek[]>(this.url+'/cr', {ProjectCode : projectCode, ParentCode: '-'},{ headers: headers })
      .map(res => {
        if (res) {
          return res;
        }
        //throw new Error('Not Found');
      });
  }

  getAspek(projectCode: string): Observable<Aspek[]> {
    this.token = JSON.parse(localStorage.getItem('currentUser'));
    const headers = this._headers.append('x-access-token', this.token.token);

    return this.httpClient.post<Aspek[]>(this.url+'/cr', {ProjectCode : projectCode},{ headers: headers })
      .map(res => {
        if (res) {
          return res;
        }
        //throw new Error('Not Found');
      });
  }

  getAspekValue(branchCode:string, projectCode: string): Observable<Aspek[]> {
    this.token = JSON.parse(localStorage.getItem('currentUser'));
    const headers = this._headers.append('x-access-token', this.token.token);

    return this.httpClient.get<Aspek[]>(this.url+'val' + '?br='+branchCode+'&prj='+projectCode, { headers: headers })
      .map(res => {
        if (res) {
          return res;
        }
        //throw new Error('Not Found');
      });
  }

  getAspekValueOH(branchCode:string, projectCode: string, empCode:string): Observable<Aspek[]> {
    this.token = JSON.parse(localStorage.getItem('currentUser'));
    const headers = this._headers.append('x-access-token', this.token.token);

    return this.httpClient.get<Aspek[]>(this.url+'valoh' + '?br='+branchCode+'&prj='+projectCode+'&em='+empCode, { headers: headers })
      .map(res => {
        if (res) {
          return res;
        }
        //throw new Error('Not Found');
      });
  }
}
