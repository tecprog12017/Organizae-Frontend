import { Component, Input } from "@angular/core";
import { NavController } from "ionic-angular"
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UserProfile, Gender, Cpf } from '../../../../models/user-profile';
import { ValidateEmail, ValidatePassword } from '../../../controller/custom-validations'
import { Http } from '@angular/http'

@Component({
  selector: "edit-cpf",
  templateUrl: 'edit-cpf.component.html'
})

//Used to take care the cpf data of the user.
export class EditCpf {
  @Input('group')
  editCpf: FormGroup;
}