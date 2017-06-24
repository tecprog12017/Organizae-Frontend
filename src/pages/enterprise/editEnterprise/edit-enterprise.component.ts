import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { EditAddress } from '../../user/edit/editAddress/edit-address.component';
import { Enterprise } from '../../../models/enterprise';
import { NavController, AlertController, NavParams } from 'ionic-angular';
import { Logger } from 'angular2-logger/core';
import { ValidatesCnpj } from '../../../controller/cnpj-custom-validations'
import { ValidateCep, ValidateAdressInformation, ValidateNumber } from '../../../controller/address-custom-validations'

@Component({
  selector: 'edit-enterprise',
  templateUrl: 'edit-enterprise.component.html'
})

export class EditEnterprise {
  editAddress: EditAddress;
  editEnterpriseForm: FormGroup;
  editedEnterprise: Enterprise;
  public currentEnterprise: Enterprise;

  //Form used to edit an existing enterprise
  constructor(private formBuilder: FormBuilder, private http: Http,
     private navCtrl: NavController, private alertCtrl: AlertController, public navParams: NavParams, private _logger: Logger) {

       //Getting enterprise selected from page list enterprise
       this.currentEnterprise = navParams.get('currentEnterprise');
      //Creating form builder with fields to edit enterprise
       this.editEnterpriseForm = formBuilder.group({
         'name': [this.currentEnterprise.name, Validators.required],
         'cnpj': [null, Validators.compose([Validators.required, ValidatesCnpj()])],
         'oldCnpj': [this.currentEnterprise.cnpj, Validators.required],
         'occupationArea': [this.currentEnterprise.occupationArea, Validators.required],
         'confirmationPassword': [null, Validators.required],
         'address': formBuilder.array([this.initAddress(),])
       });
       this._logger.info('Enterprise information was placed on form');
     }

  //Method used to submit edited value
  submitForm (value: any) :void {
    this.editedEnterprise = new Enterprise(this.editEnterpriseForm);
    this.editedEnterprise.oldCnpj = this.editEnterpriseForm.get('oldCnpj').value;
    this.editedEnterprise.setEditEnterprise(this.editEnterpriseForm);
    this.editedEnterprise.owner = this.currentEnterprise.owner;
    this.http.post('http://localhost:3000/api/enterprises/edit-enterprise', this.editedEnterprise)
    .map(res => res.json())
    .subscribe( res => {
      if(res.status === 200) {
        this.navCtrl.pop();
      } else {
        this.showEditionError();
      }
    });
  }

  //Used to notify the user about an unsuccessfull edition
  showEditionError() {
    let alert = this.alertCtrl.create({
      title:'Edition error!!',
      subTitle:'There was an error in your edition, please check your input fields.',
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
