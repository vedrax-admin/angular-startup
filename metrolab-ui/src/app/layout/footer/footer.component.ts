import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'metrolab-footer',
    templateUrl: 'footer.component.html'
})
export class FooterComponent implements OnInit {
    
    /**
     * Application version
     */
    versionInfo: string;

    /**
     * Current year
     */
    year: number;

    /**
     * Initialization method
     */
    ngOnInit() {
        this.year = new Date().getFullYear();
    }
}