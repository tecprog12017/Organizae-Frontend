import { Component,Input } from "@angular/core";
import { FormGroup } from '@angular/forms';
import { UserTokenSession } from '../../signIn/user-token-session.service'

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
  optionChecked: string

  constructor(private userTokenSession: UserTokenSession){
      this.userToken = this.userTokenSession.getToken()
      this.onInit()
  }

  //method to assign gender data from the user to the form, if the user have already registered gender date
  onInit(){
    if(this.userToken['gender']){
      if(this.userToken['gender'].genderIdentity !== 'male' && this.userToken['gender'].genderIdentity !== 'female'){
        this.isOtherGender = true
        this.theOtherGender = this.userToken['gender'].genderIdentity
        this.optionChecked = this.theOtherGender;
      }else{
        this.isOtherGender = false
        this.optionChecked = this.userToken['gender'].genderIdentity
      }
    }else{
      console.log('null')

    }

  }


  //method show a field to user write his gender, in case that it does not indentify itself with male or female
  onChangeSelectGender(genderIdentity: string){
    if(genderIdentity != 'male' && genderIdentity != 'female'){
      this.isOtherGender = true
      console.log("here", genderIdentity)
    }else{
      this.isOtherGender = false
    }
  }

  //method that hides the text field and assign user gender to the select field, in case the user gender is male or female
  onChangeInputGender(genderIdentity: string){
    genderIdentity = genderIdentity.toLowerCase()

    if(genderIdentity == 'male' || genderIdentity == 'female'){
      this.isOtherGender = false
      this.optionChecked = genderIdentity
      console.log("here again", genderIdentity)
    }

  }

}
