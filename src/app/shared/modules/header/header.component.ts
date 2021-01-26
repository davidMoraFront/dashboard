import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  lang: string;

  constructor(private translate: TranslateService) { }

  ngOnInit(): void {
    this.lang = this.translate.currentLang !== 'en' ? this.translate.currentLang : 'gb';
  }

  changeLang(language: string) {
    this.translate.use(language);
    this.lang = language !== 'en' ? language : 'gb'; 
  }

}
