import { Component,Input } from "@angular/core";
import { FormGroup } from '@angular/forms';
import { StatesService } from '../../../../pages/user/edit/editAddress/states.service'
import { UserTokenSession } from '../../signIn/user-token-session.service'

@Component({
  selector: "edit-rg",
  templateUrl: 'edit-rg.component.html',
  providers: [StatesService]
})

//Class used to deal with rg data.
export class EditRg {
  @Input('group')
  editRg: FormGroup
  userToken: Object
  states = []

  constructor(private userTokenSession: UserTokenSession, private statesService: StatesService){
      this.userToken = this.userTokenSession.getToken()
      this.states = statesService.getStates()
  }

}
