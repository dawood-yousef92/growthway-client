import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../modules/auth/_services/auth.guard';
import { LayoutComponent } from './_layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'companies',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./companies/companies.module').then((m) => m.CompaniesModule),
      },
      {
        path: 'shipping-addresses',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./shipping-addresses/shipping-addresses.module').then((m) => m.ShippingAddressesModule),
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule { }
