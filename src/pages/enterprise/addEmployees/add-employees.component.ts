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
    this.allUsers = null;

  }

  ionViewWillLoad(){
    this.getAllUsers();
  }

  getAllUsers(){
     return new Promise(resolve => {
      this.http.get("http://localhost:3000/api/UserProfiles/find-users")
      .map(res => res.json())
      . subscribe(data => {
        this.allUsers = data.userProfiles;
      resolve(this.allUsers);
      });
    });


  }


}
