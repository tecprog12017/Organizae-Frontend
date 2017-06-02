import { Component } from '@angular/core';
import { EditMain } from '../edit/editMain/edit-main.component'
import { RegisterEnterprise } from '../../enterprise/registerEnterprise/register-enterprise.component';

@Component({
  selector: "user-home",
  templateUrl: 'user-home.component.html'
})

export class UserHome {
  editMain = EditMain;
  registerEnterprise = RegisterEnterprise;
}
