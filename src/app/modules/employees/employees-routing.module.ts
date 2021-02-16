import { EmployeesDetailsComponent } from './components/employees-details/employees-details.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeesListComponent } from './components/employees-list/employees-list.component';

const routes: Routes = [
  {path: '', component: EmployeesListComponent}, 
  {path: 'create', component: EmployeesDetailsComponent}, 
  {path: ':employeeId', component: EmployeesDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule { }
