import { Component } from '@angular/core';
import { EditMain } from '../edit/editMain/edit-main.component';
import { SignIn } from '../signIn/sign-in.component';
import { NavController } from 'ionic-angular';

@Component({
  selector: "user-home",
  templateUrl: 'user-home.component.html'
})

export class UserHome {
  editMain: EditMain;

  constructor(public navCtrl: NavController) { }

  logOut () {
    this.navCtrl.setRoot(SignIn, { }, {animate:true, direction:'backwards'});
  }
}
