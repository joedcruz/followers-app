import { map } from 'rxjs/operators';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  getOrders() {
    const token = localStorage.getItem('token');

    const options = {
      headers: new HttpHeaders().append('Authorization', 'Bearer ' + token),
      params: new HttpParams().append('key', 'value')
    };

    return this.http.get('/api/orders', options)
      .pipe(
        map(response => response));
  }
}
