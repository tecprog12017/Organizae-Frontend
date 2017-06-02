import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';

import { UserTokenSession } from '../../user/signIn/user-token-session.service';
import { RegisterEnterprise } from '../registerEnterprise/register-enterprise.component';

@Component({
  templateUrl: 'list-enterprises.component.html'
})

export class ListEnterprises {
  newEnterprise = RegisterEnterprise;
  constructor(public navCtrl: NavController, private http: Http, public userTokenSession: UserTokenSession) {


  }
}
