import { Component } from '@angular/core';
import { EditMain } from '../edit/editMain/edit-main.component'
import { RegisterEnterprise } from '../../enterprise/registerEnterprise/register-enterprise.component';
import { SettingsMain } from '../accountSettings/settingsMain/settings-main.component';

@Component({
  selector: "user-home",
  templateUrl: 'user-home.component.html'
})

export class UserHome {
  editMain = EditMain;
  registerEnterprise = RegisterEnterprise;
  settingsMain = SettingsMain;
}
