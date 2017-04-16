import { Component } from "@angular/core";
import { NavController } from "ionic-angular"
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UserProfile, Information } from '../../../../models/userProfile';
import { ValidatePhone } from '../../../../controller/custom-validations'
import { Http } from '@angular/http'

@Component({
  selector: "edit",
  templateUrl: 'editAdditionalInformation.component.html'
})

//Class used to handle user secondary informations
export class EditAdditionalInformation{
  editAdditionalInformationForm: FormGroup;
  newInformations: Information;

  //Creates form where user insert birthdate and phone number.
  constructor(public navCtrl: NavController, formBuilder: FormBuilder, private http: Http) {
    this.editAdditionalInformationForm = formBuilder.group({
      'birthdate' : [null, Validators.compose([Validators.required])],
      'phone' : [null, Validators.compose([Validators.required, ValidatePhone()])]
    });
  }

  //Method to assign the birthdate and phone to the user.
  submitForm(value: any):void{
    this.newInformations = new Information(this.editAdditionalInformationForm)
    console.log(this.newInformations)
  }
}
