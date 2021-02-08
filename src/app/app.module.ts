import { SharedModule } from 'src/app/shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LanguageTranslationModule } from './shared/modules/language-translation/language-translation.module';
import { LoadingInterceptor } from './core/interceptors/loading.interceptor';
import { LoadingComponent } from './shared/components/loading/loading.component';

@NgModule({
  declarations: [
    AppComponent,
    // LoadingComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    LanguageTranslationModule,
    // SharedModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: LoadingInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
