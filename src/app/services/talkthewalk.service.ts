import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpHeaders,HttpRequest } from '@angular/common/http';
import { Talkthewalk } from '../models/talkthewalk';
import * as globalVar from '../global';  

@Injectable({
  providedIn: 'root'
})
export class TalkthewalkService {
  private urlTTW = globalVar.global_trx+"/ttw";  // URL to web api
  private urlTR = globalVar.global_trx+"/tr";  // URL to web api
  private _headers = new HttpHeaders().set('Content-Type', 'application/json');
  private token: any;
  constructor(private httpClient: HttpClient) { }

  getTtw(branchCode:string,projectCode: string, type:number): Observable<Talkthewalk> {
    this.token = JSON.parse(localStorage.getItem('currentUser'));
    const headers = this._headers.append('x-access-token', this.token.token);

    return this.httpClient.get<Talkthewalk>(this.urlTTW+'last?br='+branchCode+'&prj='+projectCode+'&typ='+type.toString(),{ headers: headers })
      .map(res => {
        if (res[0]) {
          return res[0];
        }
        throw new Error('Not Found');
      });
  }

  postTtw(ttw:Talkthewalk): Observable<Talkthewalk> {
    this.token = JSON.parse(localStorage.getItem('currentUser'));
    const headers = this._headers.append('x-access-token', this.token.token);

    return this.httpClient.post<Talkthewalk>(this.urlTTW, ttw, { headers: headers })
      .map(res => {
        if (res) {
          return res;
        }
        throw new Error('Not Found');
      });
  }

  uploadPdf(fileToUpload: File){
    this.token = JSON.parse(localStorage.getItem('currentUser'));
    let _headers = new HttpHeaders().set('x-access-token', this.token.token);
    const formData: FormData = new FormData();
    formData.append('ttwFile', fileToUpload, fileToUpload.name);
    const options: {
      observe: 'events';
      reportProgress: boolean;
      headers: HttpHeaders;
    } = {
      reportProgress: true,
      observe: 'events',
      headers: _headers
    };

    const req = new HttpRequest('POST', this.urlTTW + '/upload', formData, options);
    return this.httpClient.request(req).map((event) => { return event });
  }


  getTr(branchCode:string,projectCode: string, type:number): Observable<Talkthewalk> {
    this.token = JSON.parse(localStorage.getItem('currentUser'));
    const headers = this._headers.append('x-access-token', this.token.token);

    return this.httpClient.get<Talkthewalk>(this.urlTR+'last?br='+branchCode+'&prj='+projectCode+'&typ='+type.toString(),{ headers: headers })
      .map(res => {
        if (res[0]) {
          return res[0];
        }
        throw new Error('Not Found');
      });
  }

  getTrImg(branchCode:string,projectCode: string, type:number): Observable<Talkthewalk[]> {
    this.token = JSON.parse(localStorage.getItem('currentUser'));
    const headers = this._headers.append('x-access-token', this.token.token);

    return this.httpClient.get<Talkthewalk[]>(this.urlTR+'last?br='+branchCode+'&prj='+projectCode+'&typ='+type.toString(),{ headers: headers })
      .map(res => {
        if (res) {
          return res;
        }
        throw new Error('Not Found');
      });
  }

  postTr(ttw:Talkthewalk): Observable<Talkthewalk> {
    this.token = JSON.parse(localStorage.getItem('currentUser'));
    const headers = this._headers.append('x-access-token', this.token.token);

    return this.httpClient.post<Talkthewalk>(this.urlTR, ttw, { headers: headers })
      .map(res => {
        if (res) {
          return res;
        }
        throw new Error('Not Found');
      });
  }

  uploadTr(fileToUpload: File): Observable<string> {
    this.token = JSON.parse(localStorage.getItem('currentUser'));
    let _headers = new HttpHeaders().set('x-access-token', this.token.token);
    const formData: FormData = new FormData();

    formData.append('trFile', fileToUpload, fileToUpload.name);
    return this.httpClient.post<any>(this.urlTR + '/upload', formData, { headers: _headers })
      .map(res => {
        if (res) {
          var str: string = String(res.filename);
          return str;
        }
        throw new Error('Not Found');
      });
  }
}
