import { Component } from "@angular/core";
import { NavController } from "ionic-angular"
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UserProfile, Information } from '../../../../models/userProfile';
import { ValidateEmail, ValidatePassword } from '../../../controller/custom-validations'
import { Http } from '@angular/http'

@Component({
  selector: "edit",
  templateUrl: 'editAdditionalInformation.component.html'
})

export class EditAdditionalInformation{
  editAdditionalInformationForm: FormGroup;
  newInformations: Information;

  //Creating responsive for user profile edit gender.
  constructor(public navCtrl: NavController, formBuilder: FormBuilder, private http: Http) {
    this.editAdditionalInformationForm = formBuilder.group({
      'birthdate' : [null, Validators.compose([Validators.required])],
      'phone' : [null, Validators.compose([Validators.required])]
    });
  }

  //Creating method to submit form gender values to backend
  submitForm(value: any):void{
    this.newInformations = new Information(this.editAdditionalInformationForm)
    console.log(this.newInformations)
  }
}
