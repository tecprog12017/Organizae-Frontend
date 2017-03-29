import { Component} from "@angular/core";
import { NavController } from "ionic-angular"
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: "sign-up",
  templateUrl: 'sign-up.component.html'
})

export class SignUp {
  authForm: FormGroup;

  constructor(public navCtrl: NavController, fb: FormBuilder) {
    this.authForm = fb.group({
      'firstName' : [null, Validators.compose([Validators.required, Validators.maxLength(10)])],
      'lastName' : [null, Validators.compose([Validators.required])],
      'email' : [null, Validators.compose([Validators.required])],
      'password' : [null, Validators.compose([Validators.required])]
    })
  }

  submitForm(value: any):void{
    console.log('Form Submitted!');
    console.log(value);
  }

}
