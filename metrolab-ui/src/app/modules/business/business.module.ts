import { NgModule } from '@angular/core';
import { SharedModule } from './../../shared/shared.module';

import { BusinessRoutingModule } from './business.routing';
import { CompanyComponent } from './company/company.component';
import { EntryComponent } from './entry/entry.component';

@NgModule({
  declarations: [
    CompanyComponent,
    EntryComponent
  ],
  imports: [
    SharedModule,
    BusinessRoutingModule
  ]
})
export class BusinessModule { }