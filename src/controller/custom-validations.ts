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

export function ValidateCep (): ValidatorFn{

  return (control: AbstractControl): {[key: string]: any} => {
    var cep = control.value

    //cep have not been registered yet
    if(cep == null){
      console.info("cep has not been registered before")
      return null;
    }
    else{
      //Do nothing
    }

    //replace all non numerical characters
    cep = cep.replace(/[^a-z]+g/, '')
    cep = cep.replace(/[^\d]+g/,'');

    const cepString:string = String(cep).trim()
    console.info("Cep String: ", cepString)
    if(cepString == "" || cepString == null){
      console.error("Cep is empty")
      return { ValidateCepOutputIsEmpty : true}
    }else{
      //Do nothing
    }

    if(cepString.length != 8){
      console.error("Cep length is not valid ", cepString.length)
      return { ValidateCepOutput : true }
    }else{
      return null
    }

  }
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

    //takes off non numerical digits to avoid masks
    var isValid = phoneRegex.test(control.value);

    var phone = control.value
    //phone have not been registered yet
    if(phone == null){
      console.info("phone has not been registered before")
      return null;
    }
    else{
      //Do nothing
    }

    //take off non numerical characters of phone number to avoid masks
    phone = phone.replace(/[^\d]+g/,'');

    const phoneString:string = String(phone).trim()
    console.info("Phone String: ", phoneString)
    if(phoneString == "" || phoneString == null){
      console.error("Phone is empty")
      return { ValidatePhoneOutputIsEmpty : true}
    }else{
      //Do nothing
    }

    console.log(isValid);
    if(isValid){
      return null
    }
    else{
      return { ValidatePhoneOutput : true };
    }
  }
}

export function ValidateBirthDate(): ValidatorFn {

  return (control: AbstractControl): {[key: string]: any} => {
    var birthdate = control.value;
    console.log(birthdate);

    //birthdate have not been registered yet
    if(birthdate == null){
      console.info("birthdate has not been registered before")
      return null;
    }
    else{
      //Do nothing
    }

    const birthDateString:string = String(birthdate).trim()
    if(birthDateString == "" || birthDateString == null){
      console.error("birthDate state is empty")
      return { ValidateBirthDateIsEmpty : true };
    }else{
      console.trace("birthDate:" ,birthDateString, " is valid")
      return null
    }
  };
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

export function ValidateAdressInformation(): ValidatorFn {

  return (control: AbstractControl): {[key: string]: any} => {
    var adressInformation = control.value;
    console.log(adressInformation);

    //adressInformation have not been registered yet
    if(adressInformation == null){
      console.info("adressInformation has not been registered before")
      return null;
    }
    else{
      //Do nothing
    }

    const adressInformationString:string = String(adressInformation).trim()
    if(adressInformationString == "" || adressInformationString == null){
      console.error("complementString is empty")
      return { ValidateComplementIsEmpty : true };
    }else{
      console.trace("complementString:" ,adressInformation, " is valid")
      return null
    }
  };
}

export function ValidateNumber(): ValidatorFn {

  return (control: AbstractControl): {[key: string]: any} => {
    var number = control.value;
    console.log(number);

    //number have not been registered yet
    if(number == null){
      console.info("adressInformation has not been registered before")
      return null;
    }
    else{
      //Do nothing
    }

    //remove all not numerical characters
    number = number.replace(/[^a-z]/gi, '');
    number = number.replace(/[^\d]+g/,'');

    const numberString:string = String(number).trim()
    if(numberString == "" || numberString == null){
      console.error("numberString is empty")
      return { ValidateNumberIsEmpty : true };
    }else{
      console.trace("numberString:" ,numberString, " is valid")
      return null
    }
  }
}
