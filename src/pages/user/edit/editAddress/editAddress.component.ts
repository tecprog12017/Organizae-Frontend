import { Component } from "@angular/core";
import { NavController } from "ionic-angular"
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UserProfile, Address } from '../../../../models/userProfile';
import { ValidateEmail, ValidatePassword } from '../../../controller/custom-validations'
import { Http } from '@angular/http'

@Component({
  selector: "edit",
  templateUrl: 'editAddress.component.html'
})

//Class used to handle with user address informations.
export class EditAddress {
  editAddressForm: FormGroup;
  newAddress: Address;

  //Form responsible to register informations related to address.
  constructor(public navCtrl: NavController, formBuilder: FormBuilder, private http: Http) {
    this.editAddressForm = formBuilder.group({
      'cep' : [null, Validators.compose([Validators.required])],
      'city' : [null, Validators.compose([Validators.required])],
      'state' : [null, Validators.compose([Validators.required])],
      'neighbourhood' : [null, Validators.compose([Validators.required])],
      'number' : [null, Validators.compose([Validators.required])],
      'complement' : [null, Validators.compose([Validators.required])]
    });
  }

  //Method responsible to attribute the data of address to the user profile.
  submitForm(value: any):void{
    this.newAddress = new Address(this.editAddressForm)
    console.log(this.newAddress)
  }
}
