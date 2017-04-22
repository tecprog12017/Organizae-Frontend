import { Component,Input } from "@angular/core";
import { NavController } from "ionic-angular"
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UserProfile, Gender } from '../../../../models/user-profile';
import { ValidateEmail, ValidatePassword } from '../../../controller/custom-validations'
import { Http } from '@angular/http'
import { EditRg } from '../../../../pages/user/edit/editRg/edit-rg.component'
import { UserTokenSession } from '../../signIn/user-token-session.service'
import { enableProdMode } from '@angular/core';

@Component({
  selector: "edit-gender",
  templateUrl: 'edit-gender.component.html'
})


//Class used to collect user gender.
export class EditGender {

  @Input('group')
  editGender: FormGroup;
  userToken: Object
  isOtherGender = false
  theOtherGender = 'other'
  opitionChecked: string

  constructor(private userTokenSession: UserTokenSession){
      this.userToken = this.userTokenSession.getToken()
      this.onInit()
  }

  onInit(){
    if(this.userToken['gender']){
      if(this.userToken['gender'].genderIdentity !== 'male' && this.userToken['gender'].genderIdentity !== 'female'){
        this.isOtherGender = true
        this.theOtherGender = this.userToken['gender'].genderIdentity
        this.opitionChecked = this.theOtherGender;
      }else{
        this.isOtherGender = false
        this.opitionChecked = this.userToken['gender'].genderIdentity
      }
    }else{
      console.log('null')

    }

  }


  onChangeSelectGender(genderIdentity: string){
    if(genderIdentity != 'male' && genderIdentity !== 'female'){
      this.isOtherGender = true
      console.log("here", genderIdentity)
    }else{
      this.isOtherGender = false
    }
  }

  onChangeInputGender(genderIdentity: string){
    genderIdentity = genderIdentity.toLowerCase()

    if(genderIdentity == 'male' || genderIdentity == 'female'){
      this.isOtherGender = false
      this.opitionChecked = genderIdentity
      console.log("here again", genderIdentity)
    }

  }

}
