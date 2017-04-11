import { Component } from "@angular/core";
import { NavController } from "ionic-angular"
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UserProfile, Gender } from '../../../models/userProfile';
import { ValidateEmail, ValidatePassword } from '../../../controller/custom-validations'
import { Http } from '@angular/http'

@Component({
  selector: "edit",
  templateUrl: 'edit.component.html'
})

export class Edit {
  editForm: FormGroup;
  newGender: Gender;

  //Creating responsive for user profile sign up.
  constructor(public navCtrl: NavController, formBuilder: FormBuilder, private http: Http) {
    this.editForm = formBuilder.group({
      'genderIdentity' : [null, Validators.compose([Validators.required])],
      'pronoun' : [null, Validators.compose([Validators.required])]
    });
  }

  //Creating method to submit form values to backend
  submitForm(value: any):void{
    this.newGender = new Gender(this.editForm);
    console.log(this.newGender);
  }

}
