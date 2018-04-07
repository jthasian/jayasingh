import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token',
    'Access-Control-Allow-Origin': '*'
  })
};
@Injectable()
export class RestProvider {

  
  constructor(public http: HttpClient) {
    console.log('Hello RestProvider Provider');
  }
  
  private apiUrl = 'https://restcountries.eu/rest/v2/all';
  private getUsersUrl = 'http://localhost:8400/v1/api/user/';
  
  getCountries(): Observable<{}> {
  return this.http.get(this.apiUrl).pipe(
    map(this.extractData),
    catchError(this.handleError)
  );
}

getUsers(): Observable<{}> {
    return this.http.get(this.getUsersUrl, httpOptions).pipe(
    map(this.extractData),
    catchError(this.handleError)
  );
}

private extractData(res: Response) {
  let body = res;
  return body || { };
}

private handleError (error: Response | any) {
  let errMsg: string;
  if (error instanceof Response) {
    const err = error || '';
    errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
  } else {
    errMsg = error.message ? error.message : error.toString();
  }
  console.error(errMsg);
  return Observable.throw(errMsg);
}

}
