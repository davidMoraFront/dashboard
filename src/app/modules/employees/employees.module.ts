import { NgbdSortableHeader } from 'src/app/shared/directives/sortable.directive';
import { SharedModule } from '../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesListComponent } from './components/employees-list/employees-list.component';
import { EmployeesDetailsComponent } from './components/employees-details/employees-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [EmployeesListComponent, EmployeesDetailsComponent, NgbdSortableHeader],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    SharedModule,
    NgbModule, 
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [EmployeesListComponent]
})
export class EmployeesModule { }
