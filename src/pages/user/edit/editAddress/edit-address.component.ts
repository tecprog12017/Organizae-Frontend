import { Component,Input } from "@angular/core";
import { FormGroup } from '@angular/forms';
import { UserTokenSession } from '../../signIn/user-token-session.service'
import { StatesService } from './states.service'

@Component({
  selector: "edit-address",
  templateUrl: 'edit-address.component.html',
  providers: [StatesService]
})


//Class used to handle with user address informations.
export class EditAddress {
  @Input('group')
  editAddress: FormGroup;
  userToken: Object
  states = []

  constructor(private userTokenSession: UserTokenSession, private statesService: StatesService){
      this.userToken = this.userTokenSession.getToken()
      this.states = statesService.getStates()
  }
}
