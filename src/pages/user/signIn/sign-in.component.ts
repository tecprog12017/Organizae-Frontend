import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidateEmail, ValidatePassword } from '../../../controller/custom-validations';
import { SignUp } from '../signUp/sign-up.component';

@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.component.html'
})
export class SignIn {
  signInForm: FormGroup;
  signUp = SignUp;

  constructor(public navCtrl: NavController, formBuilder: FormBuilder) {
    this.signInForm = formBuilder.group({
      'email': [null, Validators.compose([Validators.required, ValidateEmail()])],
      'password': [null, Validators.compose([Validators.required, ValidatePassword()])]
    });
  }

submitForm(value: any): void{

}

}
