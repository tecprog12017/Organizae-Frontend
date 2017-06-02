import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

import { UserTokenSession } from '../../user/signIn/user-token-session.service';
import { RegisterEnterprise } from '../registerEnterprise/register-enterprise.component';

@Component({
  templateUrl: 'list-enterprises.component.html'
})

export class ListEnterprises {
  newEnterprise = RegisterEnterprise;
  constructor(public navCtrl: NavController, private http: Http, public userTokenSession: UserTokenSession) {
    // Setting user email as parameter to pass user to backend
    let params = new URLSearchParams();
    params.set('user', this.userTokenSession.getToken());

    // Getting enterprises that belong to logged user from backend
    this.http.get('http://localhost:3000/api/enterprises/consult-enterprises', { search: params }).map(res => res.json())
    .subscribe( res => {
      if (res.status == 200){
        //user has enterprises
      }
      else {
        //user doesnt have enterprises
      }

    });

  }
}
