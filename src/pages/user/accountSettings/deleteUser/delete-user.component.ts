import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { NavController } from 'ionic-angular';
import { UserProfile } from '../../../../models/user-profile';
import { Http } from '@angular/http';
import { AlertController } from 'ionic-angular';
import { UserTokenSession } from '../../signIn/user-token-session.service'
import { ValidateEmail, ValidatePassword } from '../../../../controller/custom-validations';
import { SignIn } from '../../signIn/sign-in.component';
import { UserHome } from '../../userHome/user-home.component';

import 'rxjs/add/operator/map';
import * as  jwt from 'jwt-simple/lib/jwt';
import * as cryptoJS from 'crypto-js/crypto-js';

@Component({
  selector: "delete-user",
  templateUrl: 'delete-user.component.html'
})

// Class DeleteUser with similars to Login
export class DeleteUser {
  deleteUserForm : FormGroup
  currentUser: UserProfile;
  userToken: Object;
  secret = 'tecprog-2017/01';

//Form used for the member to delete own account
constructor(public navCtrl: NavController, formBuilder: FormBuilder, private http: Http,
            public alertCtrl: AlertController, public userTokenSession: UserTokenSession) {
  this.deleteUserForm = formBuilder.group({'password': [null, Validators.compose([Validators.required, ValidatePassword()])],
  });
 }

 //submit used to authenticate the user in system
 submitForm(value: any):void{
   var user = {
     'email': this.userTokenSession.getToken()['email'],
     'password': this.deleteUserForm.controls['password'].value,
   };
   this.http.post('http://localhost:3000/api/UserProfiles/delete-user', user)
    .map(res => res.json())
    .subscribe(token => {
      if(token.status != 400){
        this.showDeleteUserSucess();
        this.navCtrl.setRoot(SignIn, { }, {animate: true, direction: 'forward'});
      }
      else{
        this.showDeleteUserError();
      }
    });
  }

  //Used to show the user if an error ocurred during his access attempt
  showDeleteUserSucess () {
    let alert = this.alertCtrl.create({
      title: 'Sorry to hear you\'re leaving...',
      subTitle: `Account deleted sucessfully.`,
      buttons: ['OK']
    });
    alert.present();
  }

  //Used to show the user if an error ocurred during his access attempt
  showDeleteUserError () {
    let alert = this.alertCtrl.create({
      title: 'Password Incorrect!',
      subTitle: `There was an error! Check your password's input.`,
      buttons: ['OK']
    });
    alert.present();
  }

  cancel(){
    this.navCtrl.pop();
  }

}
