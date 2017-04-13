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

export class EditCpf {
  editCpfForm: FormGroup;
  newCpf: Cpf;

  //Creating responsive for user profile edit gender.
  constructor(public navCtrl: NavController, formBuilder: FormBuilder, private http: Http) {
    this.editCpfForm = formBuilder.group({
      'cpf' : [null, Validators.compose([Validators.required])],
    });
  }

  //Creating method to submit form gender values to backend
  submitForm(value: any):void{
    this.newCpf = new Cpf(this.editCpfForm);
  }
}
