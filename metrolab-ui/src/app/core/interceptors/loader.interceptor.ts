import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable } from "rxjs";
import { LoaderService } from "../services/loader.service";
import { finalize } from "rxjs/operators";


@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

    /**
     * Way to deal with multi request
     */
    private activeRequests: number = 0;

    constructor(private loaderService: LoaderService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        //first request
        if (this.activeRequests === 0) {
            this.loaderService.startLoading();
        }

        //increment each request
        this.activeRequests++;

        return next.handle(request).pipe(
            finalize(() => {
                //decrement each request
                this.activeRequests--;
                
                //stop when last request
                if (this.activeRequests === 0) {
                    this.loaderService.stopLoading();
                }
            }));
    }

}

export let loaderInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: LoaderInterceptor,
    multi: true
};