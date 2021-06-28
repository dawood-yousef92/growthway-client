import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { ConfirmPasswordValidator } from './confirm-password.validator';
import { first } from 'rxjs/operators';
import { LoaderService } from '../_services/loader.service';
import { LookupsService } from 'src/app/pages/lookups.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  successMessage:string;
  activationLink:string;
  countries:any = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private loderService: LoaderService,
    private lookupsService: LookupsService
  ) {
    if (localStorage.getItem("token")) {
      this.router.navigate(['/home']);
    }
  }

  ngOnInit(): void {
    this.getCountries();
    this.initForm();
  }

  getCountries() {
    this.lookupsService.getCountries().subscribe((data) => {
      // this.countries = data.result.countries;
      this.countries.push(data.result.countries.find(item => item.id === '7f4c2c35-feb9-4f6c-9159-9d9280bd047c'));
    });
  }

  getCountryCode() {
    if(this.countries?.find(item => item?.id === this.f.countryId.value)?.countryCode) {
      return this.countries.find(item => item?.id === this.f.countryId.value)?.countryCode;
    }
    return;
  }

  get f() {
    return this.registrationForm.controls;
  }

  initForm() {
    this.registrationForm = this.fb.group(
      {
        email: [
          '',
          Validators.compose([
            Validators.required,
            Validators.email,
            Validators.minLength(6),
            Validators.maxLength(320),
          ]),
        ],
        name: [
          '',
          Validators.compose([
            Validators.required,
          ]),
        ],
        countryId: [
          '',
          Validators.compose([
            Validators.required,
          ]),
        ],
        phoneNumber: [
          '',
          Validators.compose([
            Validators.required,
            Validators.pattern("[0-9]+"),
            Validators.maxLength(11),
            Validators.minLength(10),
          ]),
        ],
        password: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(100),
          ]),
        ],
        cPassword: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(100),
          ]),
        ],
        agree: [false, Validators.compose([Validators.required])],
      },
      {
        validator: ConfirmPasswordValidator.MatchPassword,
      }
    );
  }

  submit() {
    this.loderService.setIsLoading = true;
    let a = this.f.phoneNumber.value.split('');
    if(a[0] === '0') {
      a.splice(0, 1);
      this.registrationForm.get('phoneNumber').setValue(a.join(''));
    }

    this.authService.register(this.f.email.value, this.f.name.value, this.f.countryId.value, this.f.phoneNumber.value, this.f.password.value, this.f.cPassword.value, true)
      .pipe(first())
      .subscribe((data: any) => {
        this.loderService.setIsLoading = false;
        this.successMessage = data.result.successMessage;
        this.activationLink = decodeURIComponent(data.result.emailConfirmationUrl);
      },
      (error) => {
        this.loderService.setIsLoading = false;
        console.log(error);
      });
  }

  // confirmEmail() {
  //   this.authService.confirmEmail(this.userId,this.code).subscribe((data) => {

  //   });
  // }
}
