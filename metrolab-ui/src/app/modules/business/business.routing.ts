import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EntryComponent } from './entry/entry.component';
import { CompanyComponent } from './company/company.component';


const routes: Routes = [
  { path: '', redirectTo: 'company', pathMatch: 'full' },
  {
    path: '',
    component: EntryComponent,
    children: [
      {
        path: 'company',
        component: CompanyComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessRoutingModule { }