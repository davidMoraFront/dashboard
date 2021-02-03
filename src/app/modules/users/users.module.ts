import { NgbdSortableHeader } from 'src/app/shared/directives/sortable.directive';
import { SharedModule } from './../../shared/shared.module';
import { BreadcrumbComponent } from './../../shared/components/breadcrumb/breadcrumb.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersListComponent } from './components/users-list/users-list.component';
import { UsersDetailsComponent } from './components/users-details/users-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MarkAsteriskDirective } from 'src/app/shared/directives/mark-asterisk.directive';


@NgModule({
  declarations: [UsersListComponent, UsersDetailsComponent, NgbdSortableHeader],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    NgbModule, 
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [UsersListComponent],
  // bootstrap: [UsersListComponent]
})
export class UsersModule { }
