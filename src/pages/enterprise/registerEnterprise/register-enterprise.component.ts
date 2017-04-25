import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import { AlertController } from 'ionic-angular';

@Component({
  templateUrl: 'register-enterprise.component.html'
})

export class RegisterEnterprise {
  enterpriseForm: FormGroup;

  constructor(public navCtrl: NavController, formBuilder: FormBuilder, private http: Http, public alertCtrl: AlertController) {
    this.enterpriseForm = formBuilder.group({
      'name': [null, Validators.required],
      'cnpj': [null, Validators.required],
      'occupationArea': [null, Validators.required]
//      'address': [null, Validators.compose(Validators.required)]
    });
  }

  submitForm (value: any): void {
    console.log(value);
  }
}
