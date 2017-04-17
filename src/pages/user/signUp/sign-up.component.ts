import { Component} from "@angular/core";
import { NavController } from "ionic-angular"
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UserProfile } from '../../../models/user-profile';
import { AlertController } from 'ionic-angular';
import { ValidateEmail, ValidatePassword } from '../../../controller/custom-validations';
import { Http } from '@angular/http';

@Component({
  selector: "sign-up",
  templateUrl: 'sign-up.component.html'
})


export class SignUp {
  signUpForm: FormGroup;
  newUser: UserProfile;

  //Responsive form used for the user profile sign up.
  constructor(public navCtrl: NavController, formBuilder: FormBuilder, private http: Http, private alertCtrl: AlertController) {
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
    this.http.post('http://localhost:3000/api/UserProfiles/sign-up', this.newUser)
    .map(res => res.json())
    .subscribe( res => {
      if(res.status == 200){
        this.navCtrl.pop();
      }
      else {
        this.showSignUpError();
      }
    });
  }

  //Used to show the user if an error ocurred during his registration attempt
  showSignUpError () {
    let alert = this.alertCtrl.create({
      title: 'Sign Up Error!',
      subTitle: `There was an error on your sign up! Are you sure you haven't registered before?`,
      buttons: ['OK']
    });
    alert.present();
  }
}
