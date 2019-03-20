import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EntryComponent } from './entry/entry.component';
import { CompanyComponent } from './company/company.component';


const routes: Routes = [
  {
    path: '',
    component: EntryComponent,
    children: [
      {
        path: 'company',
        component: CompanyComponent
      }
    ]
  },
  {
    path: '',
    redirectTo: '/company',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessRoutingModule { }