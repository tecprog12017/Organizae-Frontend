import { Component } from "@angular/core";
import { NavController } from "ionic-angular"
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UserProfile, Cpf, Rg, Address, Information, Gender } from '../../../../models/user-profile';
import { ValidateEmail, ValidatePassword } from '../../../controller/custom-validations'
import { Http } from '@angular/http'

@Component({
  selector: "edit",
  templateUrl: 'edit-main.component.html'
})

//Class used to handle user informations.
export class EditMain{
  editForm: FormGroup
  newCpf: Cpf
  newRg: Rg
  newAddress: Address
  newInformation: Information
  newGender: Gender


  //Form that collect all data the user provides by the slides form .
  constructor(public navCtrl: NavController, private formBuilder: FormBuilder, private http: Http) {
    this.editForm = formBuilder.group({
      'documents' : formBuilder.array([this.initRg(), this.initCpf()],),
      'address' : formBuilder.array([ this.initAddress()],),
      'personalInformation' : formBuilder.array([ this.initAdditionalInformation(), this.initGender()],)

    });
  }

  //Method to assign new informations to current user.
  submitForm(value: any):void{
    this.newRg = new Rg(this.editForm)
    this.newCpf = new Cpf(this.editForm)
    this.newAddress = new Address(this.editForm)
    this.newInformation = new Information(this.editForm)
    this.newGender = new Gender(this.editForm)

    console.log('rg',this.newRg)
    console.log('cpf',this.newCpf)
    console.log('address', this.newAddress)
    console.log('information', this.newInformation)
    console.log('gender', this.newGender)

  }

  //Method that connect component cpf to the main form
  initCpf(){
    return this.formBuilder.group({
      'cpf' : [null, Validators.compose([Validators.required])]
    });
  }

  //Method that connect component rg to the main form
  initRg(){
    return this.formBuilder.group({
      'rgNumber' : [null, Validators.compose([Validators.required])],
      'rgExpeditionState' : [null, Validators.compose([Validators.required])]
    });
  }

  //Method that connect component address to the main form
  initAddress(){
    return this.formBuilder.group({
      'cep' : [null, Validators.compose([Validators.required])],
      'city' : [null, Validators.compose([Validators.required])],
      'state' : [null, Validators.compose([Validators.required])],
      'neighbourhood' : [null, Validators.compose([Validators.required])],
      'number' : [null, Validators.compose([Validators.required])],
      'complement' : [null, Validators.compose([Validators.required])]
    });
  }

  //Method that connect component additional information to the main form
  initAdditionalInformation(){
    return this.formBuilder.group({
      'birthdate' : [null, Validators.compose([Validators.required])],
      'phone' : [null, Validators.compose([Validators.required])]
    });
  }

  //Method that connect component gender to the main form
  initGender(){
    return this.formBuilder.group({
      'genderIdentity' : [null, Validators.compose([Validators.required])],
      'pronoun' : [null, Validators.compose([Validators.required])]
    });
  }
}
