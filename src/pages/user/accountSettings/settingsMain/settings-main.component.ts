import { Component } from '@angular/core';
import { DeleteUser } from '../deleteUser/delete-user.component';

@Component({
  selector: "settings-main",
  templateUrl: 'settings-main.component.html'
})

export class SettingsMain {
  deleteUser = DeleteUser;
}
