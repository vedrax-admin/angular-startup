import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class LoaderService {

    /**
     * Hold the loading status that needs to be share with other components
     */
    private loadingStatus: BehaviorSubject<boolean>;

    /**
     * An Observable of the loading status 
     */
    public loading : Observable<boolean>;

    constructor(){
        this.loadingStatus = new BehaviorSubject(false);
        this.loading = this.loadingStatus.asObservable();
    }

    /**
     * Start loading
     */
    startLoading() {
        this.loadingStatus.next(true);
    }

    /**
     * Stop loading
     */
    stopLoading() {
        this.loadingStatus.next(false);
    }

}