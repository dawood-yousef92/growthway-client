import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutUsComponent } from './about-us.component';
import { TranslationModule } from 'src/app/modules/i18n/translation.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { HomeComponent } from '../home/home.component';



@NgModule({
  declarations: [AboutUsComponent],
  imports: [
    CommonModule,
    TranslationModule,
    MatExpansionModule,
    MatIconModule,
    SlickCarouselModule,
    MatTabsModule,
    RouterModule.forChild([
      {
        path: '',
        component: AboutUsComponent,
      },
    ]),
  ],
})
export class AboutUsModule { }
