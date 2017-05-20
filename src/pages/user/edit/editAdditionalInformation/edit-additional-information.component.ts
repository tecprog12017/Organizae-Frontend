import { Component, Input } from "@angular/core";
import { NavController } from "ionic-angular"
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UserProfile, Information } from '../../../../models/user-profile';
import { Http } from '@angular/http'
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
