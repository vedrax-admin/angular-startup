import { Component, OnInit } from '@angular/core';

import { environment as env } from './../../../environments/environment';

const VERSION = env.version;

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
        this.versionInfo = VERSION;
        this.year = new Date().getFullYear();
    }
}