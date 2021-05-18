import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaqComponent } from './faq.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { TranslationModule } from 'src/app/modules/i18n/translation.module';

@NgModule({
  declarations: [FaqComponent],
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
        component: FaqComponent,
      },
    ]),
  ],
})
export class FaqModule { }
