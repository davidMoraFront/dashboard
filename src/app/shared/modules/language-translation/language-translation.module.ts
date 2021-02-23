import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    // TranslateModule.forRoot({
    //   loader: {
    //     provide: TranslateLoader,
    //     useFactory: httpTranslateLoader,
    //     deps: [HttpClient]
    //   }
    // })
  ],
  // exports: [TranslateModule]
})
export class LanguageTranslationModule {
  constructor(private translate: TranslateService) {
      // Gets Default language from browser if available, otherwise set English ad default
      this.translate.addLangs(['en', 'fr', 'ur', 'es', 'it', 'fa', 'de', 'zh-CHS']);
      this.translate.setDefaultLang('en');
      const browserLang = this.translate.getBrowserLang();
      this.translate.use(browserLang.match(/en|es/) ? browserLang : 'en');
  }
}
