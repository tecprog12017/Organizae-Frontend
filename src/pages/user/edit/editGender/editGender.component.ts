import { Component } from "@angular/core";
import { NavController } from "ionic-angular"
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UserProfile, Gender } from '../../../../models/userProfile';
import { ValidateEmail, ValidatePassword } from '../../../controller/custom-validations'
import { Http } from '@angular/http'
import { EditRg } from '../../../../pages/user/edit/editRg/editRg.component'

@Component({
  selector: "edit",
  templateUrl: 'editGender.component.html'
})

export class EditGender {
  editGenderForm: FormGroup;
  newGender: Gender;

  //Creating responsive for user profile edit gender.
  constructor(public navCtrl: NavController, formBuilder: FormBuilder, private http: Http) {
    this.editGenderForm = formBuilder.group({
      'genderIdentity' : [null, Validators.compose([Validators.required])],
      'pronoun' : [null, Validators.compose([Validators.required])]
    });
  }

  //Creating method to submit form gender values to backend
  submitForm(value: any):void{
    this.newGender = new Gender(this.editGenderForm)
    console.log(this.newGender)
    this.navCtrl.push(EditRg)
  }
}
