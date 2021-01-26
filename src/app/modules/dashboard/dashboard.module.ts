import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { BreadcrumbComponent } from 'src/app/shared/components/breadcrumb/breadcrumb.component';


@NgModule({
  declarations: [DashboardComponent, BreadcrumbComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    TranslateModule
  ],
  exports: [DashboardComponent]
})
export class DashboardModule { }
