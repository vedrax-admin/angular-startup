import { TestBed } from '@angular/core/testing';
import {
    HttpClientTestingModule,
    HttpTestingController
} from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';

import { LoaderInterceptor } from './loader.interceptor';
import { LoaderService } from '../services/loader.service';
import { MockLoaderService } from './../../testing/services/loader.service.mock';
import { Data } from './../../testing/data/util.data';
import { finalize } from 'rxjs/operators';

const testUrl = '/data';

describe('LoaderInterceptor', () => {
    describe('intercept', () => {
        let loaderService: LoaderService;
        let httpClient: HttpClient;
        let httpMock: HttpTestingController;

        beforeEach(() => {
            TestBed.configureTestingModule({
                providers: [LoaderInterceptor,
                    { provide: LoaderService, useClass: MockLoaderService },
                    {
                        provide: HTTP_INTERCEPTORS,
                        useClass: LoaderInterceptor,
                        multi: true,
                    }
                ],
                imports: [HttpClientTestingModule]
            });
            httpClient = TestBed.get(HttpClient);
            httpMock = TestBed.get(HttpTestingController);
            loaderService = TestBed.get(LoaderService);
            spyOn(loaderService, 'startLoading');
            spyOn(loaderService, 'stopLoading');
        });

        it('When request starts the loader starts and ends as expected', () => {

            // Make an HTTP GET request
            httpClient.get<Data>(testUrl)
                .pipe(
                    finalize(() => expect(loaderService.stopLoading).toHaveBeenCalledTimes(1))
                ).subscribe(
                    res => {
                        expect(loaderService.startLoading).toHaveBeenCalledTimes(1);
                    });

        });

    });
});