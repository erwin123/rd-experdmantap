import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { StatemanagementService } from '../services/statemanagement.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as globalVar from '../global';
import { Wakeupcall } from '../models/wakeupcall';

@Injectable({
  providedIn: 'root'
})
export class WakeupcallService {
  private url = globalVar.global_trx + "/wakeupcall";  // URL to web api
  private _headers = new HttpHeaders().set('Content-Type', 'application/json');
  private token: any;
  constructor(private httpClient: HttpClient, private stateService: StatemanagementService) { }

  uploadVideo(fileToUpload: File): Observable<string> {
    this.token = JSON.parse(localStorage.getItem('currentUser'));
    let _headers = new HttpHeaders().set('x-access-token', this.token.token);
    const formData: FormData = new FormData();

    formData.append('wkcallFile', fileToUpload, fileToUpload.name);
    return this.httpClient.post<any>(this.url + '/upload', formData, { headers: _headers })
      .map(res => {
        if (res) {
          var str: string = String(res.filename);
          return str;
        }
        throw new Error('Not Found');
      });
  }

  postWakeupcall(wakeupcall: Wakeupcall): Observable<Wakeupcall> {
    this.token = JSON.parse(localStorage.getItem('currentUser'));
    const headers = this._headers.append('x-access-token', this.token.token);
    return this.httpClient.post<Wakeupcall>(this.url, wakeupcall, { headers: headers })
      .map(res => {
        if (res) {
          return res;
        }
        throw new Error('Not Found');
      });
  }

  getLastestWakeupcall(projectCode: string, branchCode: string): Observable<Wakeupcall> {
    this.token = JSON.parse(localStorage.getItem('currentUser'));
    const headers = this._headers.append('x-access-token', this.token.token);

    return this.httpClient.get<Wakeupcall>(this.url + '/last?br=' + branchCode + '&prj=' + projectCode, { headers: headers })
      .map(res => {
        if (res[0]) {
          return res;
        }
        //throw new Error('Not Found');
      });
  }
}
