import { Component,Input } from "@angular/core";
import { NavController } from "ionic-angular"
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UserProfile, Address } from '../../../../models/user-profile';
import { ValidateEmail, ValidatePassword } from '../../../controller/custom-validations'
import { Http } from '@angular/http'
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
