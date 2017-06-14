import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

import { UserProfile } from '../../../models/user-profile/';
import { UserTokenSession } from '../../user/signIn/user-token-session.service';
import { Enterprise } from '../../../models/enterprise';

@Component({
  templateUrl: 'add-employees.component.html'
})

export class AddEmployees {
  allUsers: Array<Object>;
  selectedUsers: Array<String>;
  currentEnterprise: Enterprise;

  constructor(public navCtrl: NavController, private http: Http, public userTokenSession: UserTokenSession,
              public navParams: NavParams) {
    this.allUsers = null;
    this.selectedUsers = [];
    this.currentEnterprise = navParams.get('currentEnterprise');

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

  addEmployee(userEmail, checkBoxEvent){
    if(checkBoxEvent.checked){
      this.selectedUsers.push(userEmail);
    }else{
      let indexOfUserEmail = this.selectedUsers.indexOf(userEmail);
      this.selectedUsers.splice(indexOfUserEmail, 1);
    }
  }

  registerEmployees(){
    console.log(this.currentEnterprise.owner, this.currentEnterprise.name);

    let selectEnterprise = {
                            "owner":{
                                "email":this.currentEnterprise.owner
                                },
                            "name": this.currentEnterprise.name
                          }

    let selectEmployees = {
                            "employees": this.selectedUsers
                          }

    let data = new URLSearchParams();
    data.append('enterprise', JSON.stringify(selectEnterprise));
    data.append('users', JSON.stringify(selectEmployees));

    this.http.post('http://localhost:3000/api/enterprises/add-employee', data).subscribe();

    this.http.post('http://localhost:3000/api/UserProfiles/add-enterprise', data).subscribe();
  }


}
