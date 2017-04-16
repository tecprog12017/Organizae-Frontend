import { Component } from "@angular/core";
import { NavController } from "ionic-angular"
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UserProfile, Rg } from '../../../../models/userProfile';
import { ValidateEmail } from '../../../../controller/custom-validations'
import { Http } from '@angular/http'
import { EditAddress } from '../../../../pages/user/edit/editAddress/editAddress.component'

@Component({
  selector: "edit",
  templateUrl: 'editRg.component.html'
})

//Class used to deal with rg data.
export class EditRg {
  editRgForm: FormGroup;
  newRg: Rg;

  //Form that collect number and where the document was made.
  constructor(public navCtrl: NavController, formBuilder: FormBuilder, private http: Http) {
    this.editRgForm = formBuilder.group({
      'rgNumber' : [null, Validators.compose([Validators.required])],
      'rgExpeditionState' : [null, Validators.compose([Validators.required, Validators.maxLength(15)])]
    });
  }

  //Method to assign rg to current user.
  submitForm(value: any):void{
    this.newRg = new Rg(this.editRgForm);
    console.log(this.newRg);
    this.navCtrl.push(EditAddress);
  }

}
