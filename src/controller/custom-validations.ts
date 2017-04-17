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

//Validation used to not allow letters, special characters and short strings in phone number
export function ValidatePhone (): ValidatorFn {

  return (control: AbstractControl): {[key: string]: any} => {
    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,7}$/im
    var isValid = phoneRegex.test(control.value);

    console.log(isValid);
    if(isValid){
      return null
    }
    else{
      return { ValidatePhoneOutput : true };
    }
  }
}
