import { Component } from '@angular/core';

import { SignIn } from '../signIn/sign-in.component';
import { NavController } from 'ionic-angular';

import { EditMain } from '../edit/editMain/edit-main.component';
import { RegisterEnterprise } from '../../enterprise/registerEnterprise/register-enterprise.component';
import { SettingsMain } from '../accountSettings/settingsMain/settings-main.component';
import { ListEnterprises } from '../../enterprise/listEnterprises/list-enterprises.component';
import { UserTokenSession } from '../signIn/user-token-session.service';
import { EditEnterprise } from '../../enterprise/editEnterprise/edit-enterprise.component';


@Component({
  selector: "user-home",
  templateUrl: 'user-home.component.html'
})

export class UserHome {
  editMain = EditMain;
  registerEnterprise = RegisterEnterprise;
  settingsMain = SettingsMain;
  editEnterprise = EditEnterprise;
  listEnterprises = ListEnterprises;

  constructor(public navCtrl: NavController, private userTokenSession: UserTokenSession) {

  }

  logOut () {
    this.userTokenSession.setToken(null);
    this.navCtrl.setRoot(SignIn, { }, {animate:true, direction:'backwards'});
  }
}
