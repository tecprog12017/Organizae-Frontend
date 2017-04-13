import { Component } from "@angular/core";
import { NavController } from "ionic-angular"
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UserProfile, Rg } from '../../../../models/userProfile';
import { ValidateEmail, ValidatePassword } from '../../../controller/custom-validations'
import { Http } from '@angular/http'
import { EditAddress } from '../../../../pages/user/edit/editAddress/editAddress.component'

@Component({
  selector: "edit",
  templateUrl: 'editRg.component.html'
})

export class EditRg {
  editRgForm: FormGroup;
  newRg: Rg;

  //Creating responsive for user profile edit gender.
  constructor(public navCtrl: NavController, formBuilder: FormBuilder, private http: Http) {
    this.editRgForm = formBuilder.group({
      'rgNumber' : [null, Validators.compose([Validators.required])],
      'rgExpeditionState' : [null, Validators.compose([Validators.required])]
    });
  }

  //Creating method to submit form gender values to backend
  submitForm(value: any):void{
    this.newRg = new Rg(this.editRgForm);
    console.log(this.newRg);
    this.navCtrl.push(EditAddress);
  }

}
