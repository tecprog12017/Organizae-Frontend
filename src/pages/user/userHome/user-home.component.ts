import { Component } from '@angular/core';
import { EditMain } from '../edit/editMain/edit-main.component'
import { ListEnterprises } from '../../enterprise/listEnterprises/list-enterprises.component';

@Component({
  selector: "user-home",
  templateUrl: 'user-home.component.html'
})

export class UserHome {
  editMain = EditMain;
  listEnterprises = ListEnterprises;
}
