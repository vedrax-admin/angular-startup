import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoaderService } from "./../../core/services/loader.service";
import { Subscription } from "rxjs";

@Component({
    selector: 'metrolab-loader',
    templateUrl: './loader.component.html'
})
export class LoaderComponent implements OnInit, OnDestroy {

    /**
     * Fetching state
     */
    isFetching: boolean = false;

    /**
     * We keep a reference of the loader service for unsubscribing it after component destruction
     */
    private loadingSubscription: Subscription;

    constructor(private loaderService: LoaderService) {}

    ngOnInit() {
        this.loadingSubscription = this.loaderService.isLoading
            .subscribe(value => this.isFetching = value);
    }

    /**
     * Prevent memory leak
     */
    ngOnDestroy() {
        this.loadingSubscription.unsubscribe();
    }

}