import { Component, Input } from "@angular/core";
import { FormGroup } from '@angular/forms';
import { UserTokenSession } from '../../signIn/user-token-session.service';

@Component({
  selector: "edit-cpf",
  templateUrl: 'edit-cpf.component.html'
})

//Used to take care the cpf data of the user.
export class EditCpf {
  @Input('group')
  editCpf: FormGroup;
  userToken: Object

  constructor(private userTokenSession: UserTokenSession){
      this.userToken = this.userTokenSession.getToken()
  }
}
