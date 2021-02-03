import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {path: '', component: LayoutComponent, children: [
    {path: 'dashboard', loadChildren: () => import('./../../../modules/dashboard/dashboard.module').then((m) => m.DashboardModule)},
    {path: 'users', loadChildren: () => import('./../../../modules/users/users.module').then((m) => m.UsersModule)}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
