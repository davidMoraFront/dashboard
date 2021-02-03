import { UsersDetailsComponent } from './components/users-details/users-details.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersListComponent } from './components/users-list/users-list.component';

const routes: Routes = [
  {path: '', component: UsersListComponent}, 
  {path: 'create', component: UsersDetailsComponent}, 
  {path: ':userId', component: UsersDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
