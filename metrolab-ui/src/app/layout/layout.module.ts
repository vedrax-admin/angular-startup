import { NgModule } from '@angular/core';

import { SharedModule } from './../shared/shared.module';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
    imports: [
        SharedModule
    ],
    declarations: [
        LoaderComponent,
        HeaderComponent,
        FooterComponent
    ],
    exports: []
})
export class LayoutModule { }