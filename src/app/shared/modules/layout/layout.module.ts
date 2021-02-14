import { BreadcrumbComponent } from './../../components/breadcrumb/breadcrumb.component';
import { HeaderComponent } from '../../components/header/header.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgbCollapseModule, NgbDropdownModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { LanguageTranslationModule } from '../language-translation/language-translation.module';
import { LoadingComponent } from '../../components/loading/loading.component';
import { ToastComponent } from '../../components/toast/toast.component';

@NgModule({
  declarations: [
    LayoutComponent, 
    SidebarComponent, 
    HeaderComponent, 
    LoadingComponent, 
    ToastComponent, 
    BreadcrumbComponent
  ],
  imports: [
    CommonModule,
    LanguageTranslationModule,
    TranslateModule,
    LayoutRoutingModule,
    NgbCollapseModule,
    NgbDropdownModule,
    NgbToastModule
  ]
})
export class LayoutModule { }
