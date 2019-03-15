import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment as env } from './../../../environments/environment';

const BASE_URL = env.serverUrl;

@Injectable({ providedIn: 'root' })
export class ApiService {

    private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

    constructor(private httpClient: HttpClient) { }

    public get<T>(path: string, params: HttpParams = new HttpParams()): Observable<T> {
        return this.httpClient
            .get<T>(BASE_URL + path, { params });
    }

    public put<T>(path: string, body: object = {}): Observable<T> {
        return this.httpClient
            .put<T>(BASE_URL + path, JSON.stringify(body), this.options);
    }

    public post<T>(path: string, body: object = {}): Observable<T> {
        return this.httpClient
            .post<T>(BASE_URL + path, JSON.stringify(body), this.options);
    }

    public delete<T>(path: string): Observable<T> {
        return this.httpClient
            .delete<T>(BASE_URL + path);
    }

}