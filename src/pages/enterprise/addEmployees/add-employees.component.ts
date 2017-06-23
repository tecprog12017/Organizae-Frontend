import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

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

  //This method runs before the window load completely, so we can query all users at database
  ionViewWillLoad(){
    this.getAllUsers();
  }

  //This one find all users that are not at hosted at the current enterprise
  getAllUsers(){
     return new Promise(resolve => {
      this.http.post("http://localhost:3000/api/UserProfiles/find-users", this.currentEnterprise)
      .map(res => res.json())
      . subscribe(data => {
        this.allUsers = data.userProfiles;
      resolve(this.allUsers);
      });
    });
  }

  //Add the employee select to the array that will be sent to database
  addEmployee(userEmail, checkBoxEvent){
    if(checkBoxEvent.checked){
      this.selectedUsers.push(userEmail);
    }else{
      let indexOfUserEmail = this.selectedUsers.indexOf(userEmail);
      this.selectedUsers.splice(indexOfUserEmail, 1);
    }
  }

  //This method runs the register of the selected users to the enteprise table and each user
  registerEmployees(){
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


    //Perform the addition of all employee to enterprise
    this.http.post('http://localhost:3000/api/enterprises/add-employee', data)
    .map(res => res.json())
    .subscribe(status => {
      if(status != 400){
        this.navCtrl.pop();
      }
      else{
        //To do stuff
      }
    }
    );

    //Perform the addition of the enterprise to each user
    this.http.post('http://localhost:3000/api/UserProfiles/add-enterprise', data)
    .map(res => res.json())
    .subscribe(status => {
      if(status != 400){
        //Nothing to do
      }
      else{
        //Stuff to do
      }
    }
    );
  }
}
