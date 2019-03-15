import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { LoaderService } from "../services/loader.service";
import { finalize } from "rxjs/operators";


@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

    activeRequests: number = 0;

    constructor(private loaderService: LoaderService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.activeRequests === 0) {
            this.loaderService.startLoading();
        }

        this.activeRequests++;
        return next.handle(request).pipe(
            finalize(() => {
                this.activeRequests--;
                if (this.activeRequests === 0) {
                    this.loaderService.stopLoading();
                }
            })
        )
    };

}