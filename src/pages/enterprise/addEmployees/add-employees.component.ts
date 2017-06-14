import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

import { UserProfile } from '../../../models/user-profile/';
import { UserTokenSession } from '../../user/signIn/user-token-session.service';

@Component({
  templateUrl: 'add-employees.component.html'
})

export class AddEmployees {
  allUsers: Array<Object>;

  constructor(public navCtrl: NavController, private http: Http, public userTokenSession: UserTokenSession) {
    // Setting user email as parameter to pass user to backend
    this.allUsers = null;

  }

}
