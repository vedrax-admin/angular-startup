import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import { Data } from './../../testing/data/util.data';
import { environment as env } from './../../../environments/environment';

const BASE_URL = env.serverUrl;

const testUrl = '/data';
const fullname = 'Remy Penchenat';

describe('ApiService', () => {
    let apiService: ApiService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ApiService],
            imports: [HttpClientTestingModule]
        });
        apiService = TestBed.get(ApiService);
        httpMock = TestBed.get(HttpTestingController);
    });

    afterEach(() => {
        // After every test, assert that there are no more pending requests.
        httpMock.verify();
    });

    it('Should get the data', () => {

        apiService.get<Data>(testUrl).subscribe((data: Data) => {
            testFullName(data);
        });

        mockRequest('GET');
    });

    it('Should update the data', () => {

        apiService.put<Data>(testUrl, { name: name }).subscribe((data: Data) => {
            testFullName(data);
        });

        mockRequest('PUT');
    });

    it('Should save the data', () => {

        apiService.post<Data>(testUrl, { name: name }).subscribe((data: Data) => {
            testFullName(data);
        });

        mockRequest('POST');
    });

    it('Should delete the data', () => {

        apiService.delete<Data>(testUrl).subscribe((data: Data) => {
            testFullName(data);
        });

        mockRequest('DELETE');
    });

    /**
     * Helping method for mocking request
     * 
     * @param method The expected method - GET, PUT, POST, DELETE
     * @param data The mock data to be returned
     */
    function mockRequest(method: string) {
        // The following `expectOne()` will match the request's URL.
        const req = httpMock.expectOne(`${BASE_URL}${testUrl}`);
        //Assert the method
        expect(req.request.method).toEqual(method);
        // Respond with mock data, causing Observable to resolve.
        // Subscribe callback asserts that correct data was returned.
        req.flush({ name: fullname });
    }

    /**
     * Helping method for checking the returned data
     * 
     * @param data The returned data
     */
    function testFullName(data: Data) {
        expect(data.name).toBe(fullname);
    }

});