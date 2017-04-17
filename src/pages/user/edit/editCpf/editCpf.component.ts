import { Component } from "@angular/core";
import { NavController } from "ionic-angular"
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UserProfile, Gender, Cpf } from '../../../../models/userProfile';
import { ValidateEmail, ValidatePassword } from '../../../controller/custom-validations'
import { Http } from '@angular/http'

@Component({
  selector: "editCpf",
  templateUrl: 'editCpf.component.html'
})

//Used to take care the cpf data of the user.
export class EditCpf {
  editCpfForm: FormGroup;
  newCpf: Cpf;

  //Form responsible to collect the cpf of user.
  constructor(public navCtrl: NavController, formBuilder: FormBuilder, private http: Http) {
    this.editCpfForm = formBuilder.group({
      'cpf' : [null, Validators.compose([Validators.required, Validators.maxLength(12)])],
    });
  }

  //Method that assign cpf to user profile.
  submitForm(value: any):void{
    this.newCpf = new Cpf(this.editCpfForm);
  }
}
