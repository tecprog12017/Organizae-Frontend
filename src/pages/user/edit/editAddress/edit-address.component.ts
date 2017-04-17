import { Component,Input } from "@angular/core";
import { NavController } from "ionic-angular"
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UserProfile, Address } from '../../../../models/user-profile';
import { ValidateEmail, ValidatePassword } from '../../../controller/custom-validations'
import { Http } from '@angular/http'

@Component({
  selector: "edit-address",
  templateUrl: 'edit-address.component.html'
})

//Class used to handle with user address informations.
export class EditAddress {
  @Input('group')
  editAddress: FormGroup;
}
