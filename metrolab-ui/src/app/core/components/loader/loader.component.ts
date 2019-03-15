import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoaderService } from "../../services/loader.service";
import { Subscription } from "rxjs";

@Component({
    selector: 'metrolab-loader',
    templateUrl: './loader.component.html'
})
export class LoadingScreenComponent implements OnInit, OnDestroy {

    isFetching: boolean = false;
    private loadingSubscription: Subscription;

    constructor(private loaderService: LoaderService) {
    }

    ngOnInit() {
        this.loadingSubscription = this.loaderService.loading
            .subscribe(value => this.isFetching = value);
    }

    ngOnDestroy() {
        this.loadingSubscription.unsubscribe();
    }

}