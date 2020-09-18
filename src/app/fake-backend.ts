import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class FakeBackendInterceptor implements HttpInterceptor {


  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // array in local storage for registered users
    let users: any[] = JSON.parse(localStorage.getItem('users')) || [];

    // tslint:disable-next-line: max-line-length
    // let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ik1vc2ggSGFtZWRhbmkiLCJhZG1pbiI6dHJ1ZX0.iy8az1ZDe-_hS8GLDKsQKgPHvWpHl0zkQBqy1QIPOkA';
    // tslint:disable-next-line: max-line-length
    // let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvZUBkb21haW4uY29tIiwicGFzc3dvcmQiOiIxMjM0In0.bivntMoh_f5XSMBtbxPgy-zSvQiqvnjh8BDi61SZYgA';
    // tslint:disable-next-line: max-line-length
    // let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
    // tslint:disable-next-line: prefer-const
    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvZSBEQ3J1eiIsImFkbWluIjp0cnVlfQ.f26QA5Mg_PM9osvBEb2kPZxkjmGO7ZAIgMSI42Mxa7s'; // admin
    // tslint:disable-next-line: max-line-length
    // let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvZSBEQ3J1eiIsImFkbWluIjpmYWxzZX0.LCwT_l1B6_y4qUKxyQxYzHK77PlFoKpud1gIcXpVc44'; // non-admin
    // wrap in delayed observable to simulate server api call
    return of(null).pipe(mergeMap(() => {

      // authenticate
      if (request.url.endsWith('/api/authenticate') && request.method === 'POST') {
        // find if any user matches login credentials
        // tslint:disable-next-line: prefer-const
        let body = JSON.parse(request.body);

        if (body.email === 'joe@domain.com' && body.password === '1234') {

          // tslint:disable-next-line: object-literal-shorthand
          return of(new HttpResponse({ status: 200, body: { token: token } }));

        } else {
          return throwError({ error: { message: 'Username or password is incorrect' } });
        }
      }

      // get orders
      if (request.url.endsWith('/api/orders') && request.method === 'GET') {
        // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
        if (request.headers.get('Authorization') === 'Bearer ' + token) {
          return of(new HttpResponse({ status: 200, body: [1, 2, 3] }));
        } else {
          // return 401 not authorised if token is null or invalid
          return throwError({ error: { message: 'Unauthorised' } });
        }
      }

      // pass through any requests not handled above
      return next.handle(request);

    }))

      // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
      .pipe(materialize())
      .pipe(delay(500))
      .pipe(dematerialize());
  }
}

export let fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};
