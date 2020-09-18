import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line: typedef
  login(credentials) {
    return this.http.post('/api/authenticate', JSON.stringify(credentials))
      .pipe(
        map(response => {
          console.log(response);
          if (response) {
            // tslint:disable-next-line: no-string-literal
            // tslint:disable-next-line: quotemark
            localStorage.setItem('token', response['token']);
            return true;
          }
          return false;
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn() {
    // return jwtHelper.isTokenExpired(token);

    const jwtHelper = new JwtHelperService();
    const token = localStorage.getItem('token');

    if (!token) {
      return false;
    }


    const expirationDate = jwtHelper.getTokenExpirationDate(token);
    const isExpired = jwtHelper.isTokenExpired(token);

    console.log('Expiration Date:', expirationDate);
    console.log('Is Expired:', isExpired);

    return !isExpired;
  }

  get currentUser() {
    const token = localStorage.getItem('token');
    if (!token) { return null; }

    return new JwtHelperService().decodeToken(token);
  }
}
