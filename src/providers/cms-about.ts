import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { About } from '../models/about';

/*
  Generated class for the CmsCars provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class CmsAbout {

  constructor(public http: Http) {}

  // load(offset): Observable<About[]> {
  //   return this.http.get(`http://api.cmsauto.com/news?offset=` + offset)
  //     .map(res => <About[]>res.json());
  // }

  load(offset): Observable<About[]> {
    return this.http.get(`assets/news.json`)
        .map(res => <About[]>res.json());
  }
}
