import { Component } from "@angular/core";
import { NavController } from "ionic-angular"
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UserFullProfile, Cpf, Rg, Address, Information, Gender } from '../../../../models/user-profile';
import { ValidateEmail, ValidatePassword } from '../../../controller/custom-validations'
import { Http } from '@angular/http'
import { UserTokenSession } from '../../signIn/user-token-session.service'
import { UserHome } from '../../userHome/user-home.component';
import { AlertController } from 'ionic-angular';

import 'rxjs/add/operator/map';
import * as  jwt from 'jwt-simple/lib/jwt';

@Component({
  selector: "edit",
  templateUrl: 'edit-main.component.html'
})

//Class used to handle user additional informations.
export class EditMain{
  editForm: FormGroup
  newCpf: Cpf
  newRg: Rg
  newAddress: Address
  newInformation: Information
  newGender: Gender
  userFullProfile: UserFullProfile
  secret = 'tecprog-2017/01';


  //Form that collect all data the user provides by the slides form .
  constructor(public navCtrl: NavController, private formBuilder: FormBuilder,
              private http: Http, public userTokenSession: UserTokenSession,
              public alertCtrl: AlertController) {
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

    this.userFullProfile = new UserFullProfile('hugo@hugo.com',this.newRg, this.newCpf, this.newAddress, this.newInformation, this.newGender)
    this.http.post('http://localhost:3000/api/UserProfiles/update', this.userFullProfile)
    .map(res => res.json())
    .subscribe(token =>{
      if(token.status != 400){
        var userToken = jwt.decode(token, this.secret);
        this.userTokenSession.setToken(userToken)
        this.navCtrl.setRoot(UserHome, { }, {animate: true, direction: 'forward'});
      }
      else{
        this.showUpdateError();
      }
    });

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


  //Used to show the user if an error ocurred during his access attempt
  showUpdateError () {
    let alert = this.alertCtrl.create({
      title: 'Update Error!',
      subTitle: `There was an error on your update form! Check your inputs.`,
      buttons: ['OK']
    });
    alert.present();
  }

}
