import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgbCollapseModule, NgbDropdownModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { LanguageTranslationModule } from '../language-translation/language-translation.module';
import { LoadingComponent } from '../../components/loading/loading.component';

@NgModule({
  declarations: [LayoutComponent, SidebarComponent, HeaderComponent, LoadingComponent],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    TranslateModule,
    NgbCollapseModule,
    NgbNavModule,
    NgbDropdownModule,
    LanguageTranslationModule
  ]
})
export class LayoutModule { }
