import { Component } from '@angular/core';
import { EditMain } from '../edit/editMain/editMain.component'

@Component({
  selector: "user-home",
  templateUrl: 'user-home.component.html'
})

export class UserHome {
  editMain = EditMain;
}
