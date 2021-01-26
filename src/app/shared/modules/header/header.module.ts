import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { NgbDropdownModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { LanguageTranslationModule } from '../language-translation/language-translation.module';


@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    NgbDropdownModule,
    NgbNavModule,
    TranslateModule,
    LanguageTranslationModule
  ],
  exports: [HeaderComponent]
})
export class HeaderModule { }
