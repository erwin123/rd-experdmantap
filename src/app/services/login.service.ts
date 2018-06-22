import { Injectable } from '@angular/core';
import { Users } from '../models/users';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import * as globalVar from '../global'; //<==== this one

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url = globalVar.sep+'/um/useraccount';  // URL to web api

  constructor() {
    
  }

  login(){
    console.log(this.url);
  }
}
