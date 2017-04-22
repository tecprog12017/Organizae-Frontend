import { Component,Input } from "@angular/core";
import { NavController } from "ionic-angular"
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UserProfile, Rg } from '../../../../models/user-profile';
import { ValidateEmail } from '../../../../controller/custom-validations'
import { Http } from '@angular/http'
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
