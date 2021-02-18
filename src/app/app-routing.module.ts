import { LoginComponent } from './core/components/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './core/components/signup/signup.component';
import { AuthGuard } from './core/guards/auth-guard';

const routes: Routes = [
  {path: '', loadChildren: () => import('./shared/modules/layout/layout.module').then((m) => m.LayoutModule)},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
