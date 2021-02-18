import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  lang: string;

  constructor(private translate: TranslateService, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.lang = this.translate.currentLang !== 'en' ? this.translate.currentLang : 'gb';
  }

  changeLang(language: string) {
    this.translate.use(language);
    this.lang = language !== 'en' ? language : 'gb'; 
  }

  logout() {
    this.authenticationService.logout();
  }

}
