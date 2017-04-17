import { Component,Input } from "@angular/core";
import { NavController } from "ionic-angular"
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UserProfile, Rg } from '../../../../models/user-profile';
import { ValidateEmail } from '../../../../controller/custom-validations'
import { Http } from '@angular/http'
import { EditAddress } from '../../../../pages/user/edit/editAddress/edit-address.component'

@Component({
  selector: "edit-rg",
  templateUrl: 'edit-rg.component.html'
})

//Class used to deal with rg data.
export class EditRg {
  @Input('group')
  editRg: FormGroup
}
