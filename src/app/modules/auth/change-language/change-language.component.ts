import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { TranslationService } from '../../../modules/i18n/translation.service';

interface LanguageFlag {
  lang: string;
  name: string;
  flag: string;
  active?: boolean;
}

@Component({
  selector: 'app-change-language',
  templateUrl: './change-language.component.html',
  styleUrls: ['./change-language.component.scss']
})
export class ChangeLanguageComponent implements OnInit {

  language: LanguageFlag;
  languages: LanguageFlag[] = [
    {
      lang: 'en',
      name: 'English',
      flag: './assets/images/226-united-states.svg',
    },
    {
      lang: 'ar',
      name: 'العربية',
      flag: './assets/images/008-saudi-arabia.svg',
    },
  ];
  constructor(
    private translationService: TranslationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.setSelectedLanguage();
    this.router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe((event) => {
        this.setSelectedLanguage();
      });
  }

  setLanguageWithRefresh(lang) {
    this.setLanguage(lang);
    window.location.reload();
  }

  setLanguage(lang) {
    var file = document.getElementById('rtl-file');
    if(lang === 'ar') {
      if(!file){
        var head  = document.getElementsByTagName('head')[0];
        var link  = document.createElement('link');
        link.rel  = 'stylesheet';
        link.type = 'text/css';
        link.href = './assets/css/bootstrap-rtl.min.css';
        link.media = 'all';
        var link2  = document.createElement('link');
        link2.rel  = 'stylesheet';
        link2.type = 'text/css';
        link2.href = './assets/css/style-rtl.css';
        link2.media = 'all';
        var html  = document.getElementsByTagName('html')[0];
        head.appendChild(link);
        head.appendChild(link2);
        setTimeout(() => {
          html.id="rtl-file";
          html.dir="rtl";
          html.style.direction = "rtl";
        },200);
      }
    }
    this.languages.forEach((language: LanguageFlag) => {
      if (language.lang === lang) {
        language.active = true;
        this.language = language;
      } else {
        language.active = false;
      }
    });
    this.translationService.setLanguage(lang);
  }

  setSelectedLanguage(): any {
    this.setLanguage(this.translationService.getSelectedLanguage());
  }
}
