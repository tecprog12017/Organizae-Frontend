import { Component,Input } from "@angular/core";
import { NavController } from "ionic-angular"
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UserProfile, Address } from '../../../../models/userProfile';
import { ValidateEmail, ValidatePassword } from '../../../controller/custom-validations'
import { Http } from '@angular/http'

@Component({
  selector: "editAddress",
  templateUrl: 'editAddress.component.html'
})

//Class used to handle with user address informations.
export class EditAddress {
  @Input('group')
  editAddress: FormGroup;
}
