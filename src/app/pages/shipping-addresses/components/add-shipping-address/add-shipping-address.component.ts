import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from 'src/app/modules/auth/_services/loader.service';
import { LookupsService } from 'src/app/pages/lookups.service';
import { ShippingAddressesService } from '../../shipping-addresses.service';

@Component({
  selector: 'app-add-shipping-address',
  templateUrl: './add-shipping-address.component.html',
  styleUrls: ['./add-shipping-address.component.scss']
})
export class AddShippingAddressComponent implements OnInit {
  closeResult = '';
  createShippingAddress: FormGroup;
  countries:any[] = [];
  cities:any[] = [];
  countriesFilter:string = '';
  shippingAddressId:any;
  shippingAddressItem:any;

  constructor( private router: Router,
    private fb: FormBuilder, 
    private loderService: LoaderService,
    private toaster: ToastrService,
    private shippingAddressesService:ShippingAddressesService,
    private lookupsService:LookupsService,
    private modalService: NgbModal,
    private route: ActivatedRoute,) { }

  initForm() {
    this.createShippingAddress = this.fb.group({
      phone: [
        this.shippingAddressItem?.phone || '',
        Validators.compose([
          Validators.pattern("[0-9]+"),
          Validators.maxLength(11),
        ]),
      ],
      countryId: [
        this.shippingAddressItem?.countryId || ''
      ],
      cityId: [
        this.shippingAddressItem?.cityId || ''
      ],
    });
  }

  openModal(content) {
    this.modalService.open(content, { centered: true } ).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }



  getCountries() {
    this.lookupsService.getCountries().subscribe((data) => {
      this.countries = data.result.countries;
      // this.countries.push(data.result.countries.find(item => item.id === '7f4c2c35-feb9-4f6c-9159-9d9280bd047c'));
    });
  }

  getCities(e) {
    this.loderService.setIsLoading = true;
    this.createShippingAddress.get('cityId').setValue('');
    this.lookupsService.getCitiesByCountryId(e.value).subscribe((data) => {
      this.cities = data.result.cities;
      this.loderService.setIsLoading = false;
    }, (error) => {
      this.loderService.setIsLoading = false;
    });
  }

  getCountryCode() {
    return this.countries.find(item => item?.id === this.createShippingAddress.controls.countryId.value)?.countryCode;
  }

  search(e,type) {
    if(type === 'countries') {
      this.countriesFilter = e;
    }
  }

  getCompanyById() {
    // this.companiesService.getCompanyById(this.shippingAddressId).subscribe((data) => {
    //   this.shippingAddressItem = data.result;
    //   this.getCities({value: this.shippingAddressItem.countryId});
    //   this.initForm();
    // });
  }

  ngOnInit(): void {
    this.initForm();
    this.getCountries();
    // this.route.params.subscribe((data) => {
    //   this.shippingAddressId = data.id;
    //   if(this.shippingAddressId) {
    //     this.getCompanyById();
    //   }
    // });
  }

  submit() {
  }

}
