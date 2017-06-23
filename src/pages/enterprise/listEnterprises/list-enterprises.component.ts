import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

import { UserTokenSession } from '../../user/signIn/user-token-session.service';
import { RegisterEnterprise } from '../registerEnterprise/register-enterprise.component';
import { EditEnterprise } from '../editEnterprise/edit-enterprise.component';
import { AddEmployees } from '../addEmployees/add-employees.component';

@Component({
  templateUrl: 'list-enterprises.component.html'
})

export class ListEnterprises {
  newEnterprise = RegisterEnterprise;
  editEnterprise = EditEnterprise;
  addEmployees = AddEmployees;
  enterprises: Array<Object>;

  constructor(public navCtrl: NavController, private http: Http, public userTokenSession: UserTokenSession) {
    // Setting user email as parameter to pass user to backend
    this.enterprises = null;

  }

  getEnterprises()  {
    let params = new URLSearchParams();
    let userToken = this.userTokenSession.getToken();
    params.set('user', userToken["email"]);

    // Getting enterprises that belong to logged user from backend
    return new Promise(resolve => {
      this.http.get('http://localhost:3000/api/enterprises/consult-enterprises', { search: params }).map(res => res.json())
      .subscribe( res => {
        if (res){
          //User has enterprises
          this.enterprises = res.query;
          resolve(this.enterprises);
        }
        else {
          //User doesnt have enterprises
        }
      });
    });
  }

  // Pushing page to selected enterprise edition
  pushEditEnterprise(index: number) {
    this.navCtrl.push(this.editEnterprise, {
      currentEnterprise: this.enterprises[index],
    });
    console.log(this.enterprises[index]);
  }

  // Running get enterprises method before page is rendered
  ionViewWillLoad(){
    this.getEnterprises();
  }

  // Updating enterprises after coming back from new enterprise page
    ionViewWillEnter() {
        this.getEnterprises();
    }

  // Pushing page to selected enterprise edition
  pushAddEmployees(index: number){
  this.navCtrl.push(this.addEmployees, {
    currentEnterprise: this.enterprises[index],
    });
  }
}
