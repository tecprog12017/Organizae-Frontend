import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { EditAddress } from '../../user/edit/editAddress/edit-address.component';
import { Enterprise } from '../../../models/enterprise';
import { NavController, AlertController, NavParams } from 'ionic-angular';

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
     private navCtrl: NavController, private alertCtrl: AlertController, public navParams: NavParams) {

       //Getting enterprise selected from page list enterprise
       this.currentEnterprise = navParams.get('currentEnterprise');
       console.log(this.currentEnterprise);
      //Creating form builder with fields to edit enterprise
       this.editEnterpriseForm = formBuilder.group({
         'name': [this.currentEnterprise.name, Validators.required],
         'cnpj': [null, Validators.required],
         'oldCnpj': [this.currentEnterprise.cnpj, Validators.required],
         'occupationArea': [this.currentEnterprise.occupationArea, Validators.required],
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
      'cep' : [this.currentEnterprise.address.cep, Validators.compose([Validators.required])],
      'city' : [this.currentEnterprise.address.city, Validators.compose([Validators.required])],
      'state' : [this.currentEnterprise.address.state, Validators.compose([Validators.required])],
      'neighbourhood' : [this.currentEnterprise.address.neighbourhood, Validators.compose([Validators.required])],
      'number' : [this.currentEnterprise.address.number, Validators.compose([Validators.required])],
      'complement' : [this.currentEnterprise.address.complement, Validators.compose([Validators.required])]
    });
  }
}
