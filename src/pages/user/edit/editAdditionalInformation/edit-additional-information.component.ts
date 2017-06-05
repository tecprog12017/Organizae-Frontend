import { Component, Input } from "@angular/core";
import { FormGroup } from '@angular/forms';
import { UserTokenSession } from '../../signIn/user-token-session.service'

@Component({
  selector: "edit-additional-information",
  templateUrl: 'edit-additional-information.component.html'
})

//Class used to handle user secondary informations
export class EditAdditionalInformation{
  @Input('group')
  editAdditionalInformation: FormGroup;
  userToken: Object

  constructor(private userTokenSession: UserTokenSession){
      this.userToken = this.userTokenSession.getToken()
  }
}
