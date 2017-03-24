import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Car } from '../models/car';

/*
  Generated class for the CmsCars provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class CmsCars {

  constructor(public http: Http) {}

  load(offset): Observable<Car[]> {
    return this.http.get(`http://api.cmsauto.com/cars?offset=` + offset)
      .map(res => <Car[]>res.json());
  }
}
