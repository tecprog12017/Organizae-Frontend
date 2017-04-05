import { Component} from "@angular/core";
import { NavController } from "ionic-angular"
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UserProfile } from '../../../models/user-profile';
import { ValidateEmail, ValidatePassword } from '../../../controller/custom-validations';
import { Http } from '@angular/http';

@Component({
  selector: "sign-up",
  templateUrl: 'sign-up.component.html'
})


export class SignUp {
  signUpForm: FormGroup;
  newUser: UserProfile;

  //Creating responsive for user profile sign up.
  constructor(public navCtrl: NavController, formBuilder: FormBuilder, private http: Http) {
    this.signUpForm = formBuilder.group({
      'firstName' : [null, Validators.compose([Validators.required, Validators.maxLength(15)])],
      'lastName' : [null, Validators.compose([Validators.required, Validators.maxLength(15)])],
      'email' : [null, Validators.compose([Validators.required, ValidateEmail()])],
      'password' : [null, Validators.compose([Validators.required, ValidatePassword()])]
    });
  }

  //Creating method to submit form values to backend
  submitForm(value: any):void{
    this.newUser = new UserProfile(this.signUpForm);
    this.http.post('http://localhost:3000/api/UserProfiles/sign-up', this.newUser).subscribe();
    this.navCtrl.pop();
  }

}
