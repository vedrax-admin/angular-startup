import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { LoaderComponent } from './loader.component';
import { LoaderService } from './../../core/services/loader.service';
import { MockLoaderService } from './../../testing/services/loader.service.mock';

describe('LoaderComponent', () => {

    let comp: LoaderComponent;
    let loaderService: LoaderService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            // provide the component-under-test and dependent service
            providers: [
                LoaderComponent,
                { provide: LoaderService, useClass: MockLoaderService }
            ]
        });
        // inject both the component and the dependent service.
        comp = TestBed.get(LoaderComponent);
        loaderService = TestBed.get(LoaderService);

    });

    it('fetching status should be false after construction', () => {
        expect(comp.isFetching).toBe(false);
    });

    it('fetching status should be true', () => {
        spyOnProperty(loaderService, 'isLoading').and.returnValue(of(true));

        comp.ngOnInit();
        expect(comp.isFetching).toBe(true);
    });

});