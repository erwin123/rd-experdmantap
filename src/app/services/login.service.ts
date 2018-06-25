import { Injectable } from '@angular/core';
import { Users } from '../models/users';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import * as globalVar from '../global'; //<==== this one
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url = globalVar.sep + '/um/users';  // URL to web api

  constructor(private httpClient: HttpClient) {

  }

  login(username, password, done:Function) {
    return this.httpClient.post(this.url + '/login', { username: username, password: password }, httpOptions)
   
    .subscribe(
        (data) => {
          localStorage.setItem('currentUser', JSON.stringify(data));

            // do call back to original component and pass the response status
            done(data);
        },
        err => done(err)
    );
  }

  logout() {
    localStorage.removeItem('currentUser');
  }
}
