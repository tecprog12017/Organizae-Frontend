import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import { AlertController } from 'ionic-angular';
import { EditAdress } from '../user/edit/editAddress/edit-address.component';

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
      //'address': [null, Validators.compose(Validators.required)]
    });
  }

  //Submit used to register the enterprise on the database
  submitForm (value: any): void {
    this.http.post('http://localhost:3000/api/enterprises/register-enterprise', this.enterpriseForm.value)
    .map( res => res.json())
    .subscribe( res => {
      if (res.status == 200) {
        this.navCtrl.pop();
      }
      else {
        this.showRegisterError();
      }
    });
  }

  showRegisterError () {
    let alert = this.alertCtrl.create({
      title: 'Registration error!!',
      subTitle: 'There was an error in your registration. Check your cnpj',
      buttons: ['OK']
    })
  }

}
