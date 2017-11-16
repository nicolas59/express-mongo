
import { Borne } from '../model/borne';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { HttpClient } from '@angular/common/http';


@Injectable(
)
export class BornesService {
  constructor(private http: HttpClient) { }
  
  getBornes():Observable<Array<Borne>> {
    return this.http.get<Array<Borne>>('api/borne');
  } 
}
