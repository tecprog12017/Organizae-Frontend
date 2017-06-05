import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { EditAddress } from '../../user/edit/editAddress/edit-address.component';
import { Enterprise } from '../../../models/enterprise';
import { NavController, AlertController } from 'ionic-angular';

@Component({
  selector: 'edit-enterprise',
  templateUrl: 'edit-enterprise.component.html'
})

export class EditEnterprise {
  editAddress: EditAddress;
  editEnterpriseForm: FormGroup;
  editedEnterprise: Enterprise

  //Form used to edit an existing enterprise
  constructor(private formBuilder: FormBuilder, private http: Http,
     private navCtrl: NavController, private alertCtrl: AlertController) {
    this.editEnterpriseForm = formBuilder.group({
      'name': [null, Validators.required],
      'cnpj': [null, Validators.required],
      'oldCnpj': [null, Validators.required],
      'occupationArea': [null, Validators.required],
      'confirmationPassword': [null, Validators.required],
      'address': formBuilder.array([this.initAddress(),])
    });
  }

  //Method used to submit edited value
  submitForm (value: any) :void {
    this.editedEnterprise = new Enterprise(this.editEnterpriseForm);
    this.editedEnterprise.oldCnpj = this.editEnterpriseForm.get('oldCnpj').value;
    this.editedEnterprise.setEditEnterprise(this.editEnterpriseForm);
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
      'cep' : [null, Validators.compose([Validators.required])],
      'city' : [null, Validators.compose([Validators.required])],
      'state' : [null, Validators.compose([Validators.required])],
      'neighbourhood' : [null, Validators.compose([Validators.required])],
      'number' : [null, Validators.compose([Validators.required])],
      'complement' : [null, Validators.compose([Validators.required])]
    });
  }
}
