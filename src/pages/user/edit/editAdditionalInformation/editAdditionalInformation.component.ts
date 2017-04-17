import { Component, Input } from "@angular/core";
import { NavController } from "ionic-angular"
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UserProfile, Information } from '../../../../models/user-profile';
import { ValidatePhone } from '../../../../controller/custom-validations'
import { Http } from '@angular/http'

@Component({
  selector: "editAdditionalInformation",
  templateUrl: 'editAdditionalInformation.component.html'
})

//Class used to handle user secondary informations
export class EditAdditionalInformation{
  @Input('group')
  editAdditionalInformation: FormGroup;
}
