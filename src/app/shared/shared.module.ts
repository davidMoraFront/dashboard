import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageTranslationModule } from './modules/language-translation/language-translation.module';
import { NgbdSortableHeader } from './directives/sortable.directive';
import { MarkAsteriskDirective } from './directives/mark-asterisk.directive';



@NgModule({
  declarations: [BreadcrumbComponent, MarkAsteriskDirective],
  imports: [
    CommonModule,
    LanguageTranslationModule
  ],
  exports: [BreadcrumbComponent]
})
export class SharedModule { }
