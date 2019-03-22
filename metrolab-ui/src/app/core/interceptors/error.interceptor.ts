import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from './../services/authentication.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError((err: HttpErrorResponse) => {

            if (err.error instanceof ErrorEvent) {
                //TODO : add server log for client errors
            } else {

                if ([401, 403].indexOf(err.status) !== -1) {
                    // automatically logout
                    this.authenticationService.logout();
                    //location.reload(true);
                }

            }

            //rethrow error
            return throwError(err);
        }));
    }
}