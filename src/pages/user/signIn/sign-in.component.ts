import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { AlertController } from 'ionic-angular';
import { UserProfile } from '../../../models/user-profile';
import { ValidateEmail, ValidatePassword } from '../../../controller/custom-validations';
import { SignUp } from '../signUp/sign-up.component';
import { UserHome } from '../userHome/user-home.component';
import { UserTokenSession } from './user-token-session.service';

import 'rxjs/add/operator/map';
import * as  jwt from 'jwt-simple/lib/jwt';

//Template used for the page which the user will use to log in
@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.component.html'
})

//Class used for the sign in of the member in the system
export class SignIn {
  signInForm: FormGroup;
  currentUser: UserProfile;
  userToken: Object;
  signUp = SignUp;
  secret = 'tecprog-2017/01';

  //Form used for the member to access the system
  constructor(public navCtrl: NavController, formBuilder: FormBuilder, private http: Http,
              public alertCtrl: AlertController, public userTokenSession: UserTokenSession) {
    this.signInForm = formBuilder.group({
      'email': [null, Validators.compose([Validators.required, ValidateEmail()])],
      'password': [null, Validators.compose([Validators.required, ValidatePassword()])],
    });
  }

  //Submition used to check if the member is eligible to access the system
  submitForm(value: any):void{
    this.http.post('http://localhost:3000/api/UserProfiles/login', this.signInForm.value)
    .map(res => res.json())
    .subscribe(token => {
      if(token != 400){
        this.userToken = jwt.decode(token, this.secret);
        this.navCtrl.setRoot(UserHome, { }, {animate: true, direction: 'forward'});
        this.userTokenSession.setToken(this.userToken);
      }
      else{
        this.showSignInError();
      }
    }
    );
  }

  //Used to show the user if an error ocurred during his access attempt
  showSignInError () {
    let alert = this.alertCtrl.create({
      title: 'Login Error!',
      subTitle: `There was an error on your login! Check your inputs or if you are registered.`,
      buttons: ['OK']
    });
    alert.present();
  }

}
