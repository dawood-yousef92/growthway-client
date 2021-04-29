import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationModule } from 'src/app/modules/i18n/translation.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {ShippingAddressesComponent} from './shipping-addresses.component';
import { AddShippingAddressComponent } from './components/add-shipping-address/add-shipping-address.component';

@NgModule({
  declarations: [ShippingAddressesComponent, AddShippingAddressComponent],
  imports: [
    CommonModule,
    TranslationModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatSelectModule,
    MatExpansionModule,
    RouterModule.forChild([
        {
            path: '',
            component: ShippingAddressesComponent,
            children: [
                // {
                //   path: '',
                //   component: CompaniesListComponent,
                // },
                {
                  path: 'add-shipping-address',
                  component: AddShippingAddressComponent,
                },
                // {
                //   path: 'edit-company/:id',
                //   component: AddCompanyComponent,
                // },
            ]
        },
    ]),

    MatIconModule,
    MatButtonModule,
  ],
})
export class ShippingAddressesModule {}
