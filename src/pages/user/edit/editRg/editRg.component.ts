import { Component,Input } from "@angular/core";
import { NavController } from "ionic-angular"
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UserProfile, Rg } from '../../../../models/userProfile';
import { ValidateEmail } from '../../../../controller/custom-validations'
import { Http } from '@angular/http'
import { EditAddress } from '../../../../pages/user/edit/editAddress/editAddress.component'

@Component({
  selector: "editRg",
  templateUrl: 'editRg.component.html'
})

//Class used to deal with rg data.
export class EditRg {
  @Input('group')
  editRg: FormGroup
}
