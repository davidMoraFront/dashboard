import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageTranslationModule } from './modules/language-translation/language-translation.module';
import { MarkAsteriskDirective } from './directives/mark-asterisk.directive';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  declarations: [MarkAsteriskDirective, ModalComponent],
  imports: [
    CommonModule,
    LanguageTranslationModule,
  ],
  exports: [MarkAsteriskDirective],
  entryComponents: [ModalComponent]
})
export class SharedModule { }
