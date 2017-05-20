import { AbstractControl, ValidatorFn } from '@angular/forms';
import { Directive, ElementRef, HostListener, Input } from '@angular/core';

//Validation used for the email on the user account
export function ValidateEmail (): ValidatorFn {

  return (control: AbstractControl): {[key: string]: any} => {
    const emailRegex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    var isValid = emailRegex.test(control.value);

    if (isValid){
      return null;
    }
    else {
      return { ValidateEmailOutput: true};
    }
  };
}

//Validation used for the password on the user account
export function ValidatePassword (): ValidatorFn {

  return (control: AbstractControl): {[key: string]: any} => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    var isValid = passwordRegex.test(control.value);

    if (isValid){
      return null;
    }
    else {
      return { ValidatePasswordOutput: true};
    }
  }
}

export function ValidateGenderIdentity(): ValidatorFn {

  return (control: AbstractControl): {[key: string]: any} => {
    var genderIdentity = control.value;
    console.log(genderIdentity);

    //genderIdentity have not been registered yet
    if(genderIdentity == null){
      console.info("genderIdentity has not been registered before")
      return null;
    }
    else{
      //Do nothing
    }

    const genderIdentityString:string = String(genderIdentity).trim()
    if(genderIdentityString == "" || genderIdentityString == null){
      console.error("genderIdentityString state is empty")
      return { ValidateGenderIdentityIsEmpty : true };
    }else{
      console.trace("genderIdentityString:" ,genderIdentityString, " is valid")
      return null
    }
  };
}

export function ValidatePronoun(): ValidatorFn {

  return (control: AbstractControl): {[key: string]: any} => {
    var pronoun = control.value;
    console.log(pronoun);

    //pronoun have not been registered yet
    if(pronoun == null){
      console.info("pronoun has not been registered before")
      return null;
    }
    else{
      //Do nothing
    }

    const pronounString:string = String(pronoun).trim()
    if(pronounString == "" || pronounString == null){
      console.error("pronounString is empty")
      return { ValidatePronounIsEmpty : true };
    }else{
      console.trace("pronounString:" ,pronoun, " is valid")
      return null
    }
  };
}
