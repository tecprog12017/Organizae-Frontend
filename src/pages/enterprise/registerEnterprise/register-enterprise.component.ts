import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import { AlertController } from 'ionic-angular';
import { Enterprise } from '../../../models/enterprise';
import { EditAddress } from '../../user/edit/editAddress/edit-address.component';
import { UserTokenSession } from '../../user/signIn/user-token-session.service';
import { ValidatesCnpj } from '../../../controller/cnpj-custom-validations'
import { ValidateCep, ValidateAdressInformation, ValidateNumber } from '../../../controller/address-custom-validations'

@Component({
  templateUrl: 'register-enterprise.component.html'
})

export class RegisterEnterprise {
  enterpriseForm: FormGroup;
  newEnterprise: Enterprise;
  EditAddress: EditAddress;

  //Form used to create the inputs used to register an enterprise
  constructor(public navCtrl: NavController, private formBuilder: FormBuilder,
              private http: Http, public alertCtrl: AlertController,
              public userTokenSession: UserTokenSession) {
    this.enterpriseForm = formBuilder.group({
      'name': [null, Validators.required],
      'cnpj': [null, Validators.compose([Validators.required, ValidatesCnpj()])],
      'occupationArea': [null, Validators.required],
      'address': formBuilder.array([this.initAddress(),])
    });
  }

  //Submit used to register the enterprise on the database
  submitForm (value: any): void {
    this.newEnterprise = new Enterprise(this.enterpriseForm);
    this.newEnterprise.owner = this.userTokenSession.userToken;

    this.http.post('http://localhost:3000/api/enterprises/register-enterprise', this.newEnterprise)
    .map( res => res.json())
    .subscribe( res => {
      if (res.status === 200) {
        this.navCtrl.pop();
      }
      else {
        this.showRegisterError();
      }
    });
  }

  //Pop up used to notify the user of an error
  showRegisterError () {
    let alert = this.alertCtrl.create({
      title: 'Registration error!!',
      subTitle: 'There was an error in your registration. Check your cnpj',
      buttons: ['OK']
    });
    alert.present();
  }

  //Method that connect component address to the main form
  initAddress(){
    return this.formBuilder.group({
      'cep' : [null, Validators.compose([Validators.required, ValidateCep()])],
      'city' : [null, Validators.compose([Validators.required, ValidateAdressInformation()])],
      'state' : [null, Validators.compose([Validators.required])],
      'neighbourhood' : [null, Validators.compose([Validators.required, ValidateAdressInformation()])],
      'number' : [null, Validators.compose([Validators.required, ValidateNumber()])],
      'complement' : [null, null]
    });
  }

}
