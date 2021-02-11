import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageTranslationModule } from './modules/language-translation/language-translation.module';
import { MarkAsteriskDirective } from './directives/mark-asterisk.directive';
import { ModalComponent } from './components/modal/modal.component';
import { ToastComponent } from './components/toast/toast.component';

@NgModule({
  declarations: [BreadcrumbComponent, MarkAsteriskDirective, ModalComponent],
  imports: [
    CommonModule,
    LanguageTranslationModule,
  ],
  exports: [BreadcrumbComponent, MarkAsteriskDirective],
  entryComponents: [ModalComponent]
})
export class SharedModule { }
