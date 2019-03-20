import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EntryComponent } from './entry/entry.component';
import { EmployeeComponent } from './employee/employee.component';


const routes: Routes = [
  {
    path: '',
    component: EntryComponent,
    children: [
      {
        path: 'employee',
        component: EmployeeComponent
      }
    ]
  },
  {
    path: '',
    redirectTo: '/admin/employee',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }