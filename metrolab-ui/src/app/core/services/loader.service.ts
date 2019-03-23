import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class LoaderService {

    /**
     * Hold the loading status that needs to be share with other components
     */
    private loadingStatus: BehaviorSubject<boolean>;
    private loaderState: Observable<boolean>;

    constructor() {
        this.loadingStatus = new BehaviorSubject(false);
        this.loaderState = this.loadingStatus.asObservable();
    }

    get isLoading(): Observable<boolean> {
        return this.loaderState;
    }

    /**
     * Start loading
     */
    startLoading(): void {
        this.loadingStatus.next(true);
    }

    /**
     * Stop loading
     */
    stopLoading(): void {
        this.loadingStatus.next(false);
    }

}