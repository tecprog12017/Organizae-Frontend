import { Component} from "@angular/core";
import { NavController } from "ionic-angular"
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UserProfile } from '../../../models/userProfile';
import { Http } from '@angular/http';

@Component({
  selector: "sign-up",
  templateUrl: 'sign-up.component.html'
})


export class SignUp {
  signUpForm: FormGroup;
  newUser: UserProfile;

  //Creating responsive for user profile sign up.
  constructor(public navCtrl: NavController, private formBuilder: FormBuilder, private http: Http) {
    this.signUpForm = formBuilder.group({
      'firstName' : [null, Validators.compose([Validators.required, Validators.maxLength(10)])],
      'lastName' : [null, Validators.compose([Validators.required])],
      'email' : [null, Validators.compose([Validators.required])],
      'password' : [null, Validators.compose([Validators.required])]
    });
  }

  //Creating method to submit form values to backend
  submitForm(value: any):void{
    this.newUser = new UserProfile(this.signUpForm);
    this.http.post('localhost:3000/api/UserProfile/sign-up', this.newUser);
  }

}
