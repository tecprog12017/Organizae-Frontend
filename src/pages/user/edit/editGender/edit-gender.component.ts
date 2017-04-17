import { Component,Input } from "@angular/core";
import { NavController } from "ionic-angular"
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UserProfile, Gender } from '../../../../models/user-profile';
import { ValidateEmail, ValidatePassword } from '../../../controller/custom-validations'
import { Http } from '@angular/http'
import { EditRg } from '../../../../pages/user/edit/editRg/edit-rg.component'

@Component({
  selector: "edit-gender",
  templateUrl: 'edit-gender.component.html'
})

//Class used to collect user gender.
export class EditGender {

  @Input('group')
  editGender: FormGroup;

}
