import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { StatemanagementService } from '../services/statemanagement.service';
import { HttpClient, HttpHeaders, HttpRequest, HttpEventType, HttpEvent, HttpResponse } from '@angular/common/http';
import * as globalVar from '../global';
import { Internship } from '../models/internship';


@Injectable({
  providedIn: 'root'
})
export class InternshipService {
  private url = globalVar.global_trx + "/internship";  // URL to web api
  private _headers = new HttpHeaders().set('Content-Type', 'application/json');
  private token: any;
  constructor(private httpClient: HttpClient, private stateService: StatemanagementService) { }

  uploadVideo(fileToUpload: File) {

    this.token = JSON.parse(localStorage.getItem('currentUser'));
    let _headers = new HttpHeaders().set('x-access-token', this.token.token);
    const formData: FormData = new FormData();
    formData.append('internshipFile', fileToUpload, fileToUpload.name);
    const options: {
      observe: 'events';
      reportProgress: boolean;
      headers: HttpHeaders;
    } = {
      reportProgress: true,
      observe: 'events',
      headers: _headers
    };


    const req = new HttpRequest('POST', this.url + '/upload', formData, options);
    return this.httpClient.request(req).map((event) => { return event });
  }

  // uploadVideo(fileToUpload: File): Observable<string> {

  //   this.token = JSON.parse(localStorage.getItem('currentUser'));
  //   let _headers = new HttpHeaders().set('x-access-token', this.token.token);
  //   const formData: FormData = new FormData();
  //   formData.append('internshipFile', fileToUpload, fileToUpload.name);
  //   return this.httpClient.post<any>(this.url + '/upload', formData, { headers: _headers , reportProgress:true})
  //   .timeout(60000)
  //   .map(res => {
  //       if (res) {
  //         var str: string = String(res.filename);
  //         return str;
  //       }
  //       throw new Error('Not Found');
  //     });
  // }

  postInternship(internship: Internship): Observable<Internship> {
    this.token = JSON.parse(localStorage.getItem('currentUser'));
    const headers = this._headers.append('x-access-token', this.token.token);
    return this.httpClient.post<Internship>(this.url, internship, { headers: headers })
      .map(res => {
        if (res) {
          return res;
        }
        throw new Error('Not Found');
      });
  }

  getLastestInternship(projectCode: string, branchCode: string): Observable<Internship> {
    this.token = JSON.parse(localStorage.getItem('currentUser'));
    const headers = this._headers.append('x-access-token', this.token.token);

    return this.httpClient.get<Internship>(this.url + '/last?br=' + branchCode + '&prj=' + projectCode, { headers: headers })
      .map(res => {
        if (res[0]) {
          return res;
        }
        throw new Error('Not Found');
      });
  }

  getLastestInternshipRole(projectCode: string, branchCode: string, role: string): Observable<Internship> {
    this.token = JSON.parse(localStorage.getItem('currentUser'));
    const headers = this._headers.append('x-access-token', this.token.token);

    return this.httpClient.get<Internship>(this.url + '/lastrole?br=' + branchCode + '&prj=' + projectCode + '&rl=' + role, { headers: headers })
      .map(res => {
        if (res[0]) {
          return res;
        }
        throw new Error('Not Found');
      });
  }
}

