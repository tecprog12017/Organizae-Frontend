import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { NavController } from 'ionic-angular';
import { UserProfile } from '../../../../models/user-profile';
import { Http } from '@angular/http';
import { AlertController } from 'ionic-angular';
import { UserTokenSession } from '../../signIn/user-token-session.service'
import { ValidateEmail, ValidatePassword } from '../../../../controller/custom-validations';

import 'rxjs/add/operator/map';
import * as  jwt from 'jwt-simple/lib/jwt';

@Component({
  selector: "delete-user",
  templateUrl: 'delete-user.component.html'
})

// Class DeleteUser with similars to Login
export class DeleteUser {
  deleteUserForm : FormGroup
  currentUser: UserProfile;
  userToken: Object;

//Form used for the member to delete own account
constructor(public navCtrl: NavController, formBuilder: FormBuilder, private http: Http,
            public alertCtrl: AlertController, public userTokenSession: UserTokenSession) {
  this.deleteUserForm = formBuilder.group({
    'email': [null, Validators.compose([Validators.required, ValidateEmail()])],
    'password': [null, Validators.compose([Validators.required, ValidatePassword()])],
  });
 }
}
