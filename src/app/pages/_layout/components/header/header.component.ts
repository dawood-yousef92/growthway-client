import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompaniesService } from 'src/app/pages/companies/companies.service';
import { HomeService } from 'src/app/pages/home/home.service';
import { LookupsService } from 'src/app/pages/lookups.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  showSearchBox: boolean = false;
  showmobileMenu: boolean = false;
  isSticky: boolean;
  currencies: any[] = [];
  activeCurrency: any = null;
  username: string;
  loderService: any;
  categories: any;


  constructor(private homeService: HomeService,
    private router: Router,
    private companiesService: CompaniesService,
    private lookupsService: LookupsService,) { }


  getCurrencies() {
    this.lookupsService.getCurrencies().subscribe((data) => {
      this.currencies = data.result.currencies;
      this.activeCurrency = this.currencies.find(item => item.id === 'd755b09c-0ce3-4bc7-353f-08d8f772fcd0');
    });
  }

  setActiveCurrency(currency) {
    this.activeCurrency = currency;
  }

  ngOnInit(): void {


    if (localStorage.getItem('token')) {
      this.getUser();
    }
    this.getCurrencies();
    window.addEventListener('scroll', this.scroll, true);
    this.scroll;
    this.getCategoriesByBusinessType();
  }
  getBannerImages() {
    throw new Error('Method not implemented.');
  }
  getTopCategories() {
    throw new Error('Method not implemented.');
  }
  getTopProducts() {
    throw new Error('Method not implemented.');
  }
  getTopCompanies() {
    throw new Error('Method not implemented.');
  }
  getTopOfferProducts() {
    throw new Error('Method not implemented.');
  }

  scroll = (event): void => {
    if (window.pageYOffset > 130) {
      this.isSticky = true;
    }
    else {
      this.isSticky = false;
    }
  };

  showSearch() {
    this.showSearchBox = !this.showSearchBox;
    if (this.showSearchBox) {
      setTimeout(function () {
        let element = document.getElementById('searchBox');
        element.focus();
      }, 100);
    }
  }
  getCategoriesByBusinessType() {
    //this.loderService.setIsLoading = true;
    this.companiesService.getCategoriesByBusinessType('', 3, 3, true).subscribe((data) => {

      this.categories = data.result.productsCategoryItem.concat(data.result.servicesCategoryItem);
      //this.loderService.setIsLoading = false;
    }, (error) => {
      // this.loderService.setIsLoading = false;
    });
  }

  checkIfEnter(e) {
    if (e.key == 'Enter') {
      alert('serach');
    }
  }

  showMobileMenu() {
    this.showmobileMenu = !this.showmobileMenu;
  }

  checkIfLogin() {
    if (localStorage.getItem('token')) {
      return true;
    }
    else {
      return false;
    }
  }

  getProfileImage() {
    return './assets/images/defaultuser.png';
  }

  getUser() {
    this.homeService.getUser().subscribe((data) => {
      this.username = data.result.username;
    });
  }
}
