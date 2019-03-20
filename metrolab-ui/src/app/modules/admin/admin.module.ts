import { NgModule } from '@angular/core';
import { SharedModule } from './../../shared/shared.module';

import { AdminRoutingModule } from './admin.routing';
import { EmployeeComponent } from './employee/employee.component';
import { EntryComponent } from './entry/entry.component';

@NgModule({
  declarations: [
    EmployeeComponent,
    EntryComponent  
  ],
  imports: [
    SharedModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }