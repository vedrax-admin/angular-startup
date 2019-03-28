import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from './../shared/shared.module';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
    imports: [
        SharedModule,
        //we use routerLink in our templates
        RouterModule
    ],
    declarations: [
        LoaderComponent,
        HeaderComponent,
        FooterComponent
    ],
    exports: [
        LoaderComponent,
        HeaderComponent,
        FooterComponent
    ]
})
export class LayoutModule { }