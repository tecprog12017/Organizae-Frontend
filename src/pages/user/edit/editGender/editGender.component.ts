import { Component,Input } from "@angular/core";
import { NavController } from "ionic-angular"
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UserProfile, Gender } from '../../../../models/user-profile';
import { ValidateEmail, ValidatePassword } from '../../../controller/custom-validations'
import { Http } from '@angular/http'
import { EditRg } from '../../../../pages/user/edit/editRg/editRg.component'

@Component({
  selector: "editGender",
  templateUrl: 'editGender.component.html'
})

//Class used to collect user gender.
export class EditGender {

  @Input('group')
  editGender: FormGroup;

}
