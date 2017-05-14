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
//Validates used to only allow cpf according to cpf algorithm
//-> More information about this algorithm: https://http://www.geradorcpf.com/algoritmo_do_cpf.htm
export function ValidatesCpf(): ValidatorFn {

  return (control: AbstractControl): {[key: string]: any} => {
    var cpf = control.value;
    console.log(cpf);

    //cpf have not been registered yet
    if(cpf == null){
      return null;
    }
    else{
      //Do nothing
    }

    //remove all non numerical characters of cpf to prevent masks
    cpf = cpf.replace(/[^\d]+g/,'');

    const cpfIsEmptyOrOutOfLength = CheckCpfIsEmptyOrOutOfLength(cpf);
    if(cpfIsEmptyOrOutOfLength){
      console.error("Cpf:", cpf, "is not empty or out of lenght")
      return { ValidateCpfOutputEmptyOrOutOfLenght : true };
      //Do nothing
    }else{
      console.trace("Cpf:", cpf, "is not empty or out of lenght")
      //Do nothing
    }

    //check if the first digit of cpf is out of leght of is a known invalid number
    const cpfIsKnown = CheckCpfIsKnown(cpf)
    if(cpfIsKnown){
      console.trace("Cpf:", cpf, " has eleven digits and is not a known invalid number");
      console.error("Cpf is ")
      return { ValidateCpfOutput : true };
    }else{
      console.trace("Cpf:", cpf, " has eleven digits and is not a known invalid number");
    }

    const cpfFirstVerifyingDigitIsValid = ValidatesCpfFirstVerifyingDigit(cpf);
    console.log("Aquiiiiiiiiiiiiiiii:",cpfFirstVerifyingDigitIsValid)
    //check if the first verifying digit of cpf is valid
    if(cpfFirstVerifyingDigitIsValid){
      console.trace("Cpf: ", cpf, " has the first digit valid");
    }else{
      console.error("Cpf:", cpf, " has not the first digit valid")
      return { ValidateCpfOutput : true };
    }

    const cpfSecondVerifyingDigitIsValid = ValidatesCpfSecondVerifyingDigit(cpf);
    //check if the second verifying digit of cpf is valid
    if(cpfSecondVerifyingDigitIsValid){
      console.trace("Cpf: ", cpf, " has the second digit valid");
    }else{
      console.error("Cpf:", cpf, " has not the second digit valid")
      return { ValidateCpfOutput : true };
    }

    return null
  }
}

function CheckCpfIsEmptyOrOutOfLength(cpf:string){
  //cpf need to have exactly eleven digits
  if(cpf.length != 11){
    console.error("Cpf:", cpf, " does not have eleven digits");
    return true;
  }
  else{
    //Do nothing
  }

  //cpf can not be empty
  if(cpf.trim() == "" || cpf == null){
    console.error("Cpf is empty");
    return true;
  }
  else{
    console.trace('Cpf is not empty');
    return false;
  }//cpf isn't empty or
}

function CheckCpfIsKnown(cpf:string){
  //check if cpf is a known invalid number
  if(cpf == "00000000000" || cpf == "11111111111" || cpf == "22222222222" || cpf == "33333333333" ||
     cpf == "44444444444" || cpf == "55555555555" || cpf == "66666666666" || cpf == "77777777777" ||
     cpf == "88888888888" || cpf == "99999999999"){

       console.error("Cpf: ", cpf, "is a invalid known number")
       return true;
     }
  else{
    return false;
  }
}

function ValidatesCpfFirstVerifyingDigit(cpf:string){
  var adder = 0;
  var firstDigitVerifier = 0;
  const lastNumericalDigit = 9;
  const firstNumericalDigitLimit = 10;
  const secondNumericalDigitLimit = 11;

  //Loop to go through numbers zero to eight
  for(var number = 0; number < lastNumericalDigit; number++){

    //Transforms the digit(number) of cpf to a integer and append the multiply on the adder
    adder += parseInt(cpf.charAt(number)) * (firstNumericalDigitLimit - number);
  }
    //
    firstDigitVerifier = secondNumericalDigitLimit - (adder % secondNumericalDigitLimit);

    //The digit can't be higher then nine
    if(firstDigitVerifier == firstNumericalDigitLimit || firstDigitVerifier == secondNumericalDigitLimit){
      firstDigitVerifier = 0;
    }else{
      //DO NOTHING
    }

    //check if the verifying digit is equal to the the nineth digit
    if(firstDigitVerifier != parseInt(cpf.charAt(lastNumericalDigit))){
      console.log(firstDigitVerifier)
      console.log(number)
      return false;
    }else{
      //DO NOTHING
    }

  return true;
}

function ValidatesCpfSecondVerifyingDigit(cpf:string){
  var adder = 0;
  var secondDigitVerifier = 0;
  const maxNumericalDigit = 9;
  const secondNumericalDigitLimit = 11;
  const firstNumericalDigitLimit = 10;

  //loop to go through all numerical digits(zero to nine)
  for(var number = 0; number < firstNumericalDigitLimit; number++){
    //Transforms the digit(number) of cpf to integer and append the multiply in adder
    adder += parseInt(cpf.charAt(number)) * (secondNumericalDigitLimit - number)
  }

  secondDigitVerifier = secondNumericalDigitLimit - (adder % secondNumericalDigitLimit)

  //The digit can't be higher then nine
  if(secondDigitVerifier == firstNumericalDigitLimit || secondDigitVerifier == secondNumericalDigitLimit){
    secondDigitVerifier = 0
  }else{
    //DO NOTHING
  }

  //check if the verifying digit is equal to the the tenth digit
  if(secondDigitVerifier != parseInt(cpf.charAt(firstNumericalDigitLimit))){
    return false
  }else{
    return true
  }

}

export function ValidateRgExpeditionState (): ValidatorFn {

  return (control: AbstractControl): {[key: string]: any} => {
    var rgExpeditionState = control.value;
    console.log(rgExpeditionState);

    //rg expedition state have not been registered yet
    if(rgExpeditionState == null){
      console.info("rgExpeditionState has not been registered before")
      return null;
    }
    else{
      //Do nothing
    }

    //rg expedition state can't be empty
    if(rgExpeditionState.trim() == "" || rgExpeditionState == null){
      console.error("Rg expedition state is empty")
      return { ValidateRgExpeditionStateOutput : true };
    }else{
      console.trace("Rg Expedition state:" ,rgExpeditionState, " is 1valid")
      return null
    }
  };
}

export function ValidateRgNumber (): ValidatorFn {

  return (control: AbstractControl): {[key: string]: any} => {
    var rgNumber = control.value;
    console.log(rgNumber);

    //rg number have not been registered yet
    if(rgNumber == null){
      console.info("Rg number have not been registered before")
      return null;
    }
    else{
      //Do nothing
    }

    //remove all non numerical characters of rg to prevent masks
    rgNumber = rgNumber.replace(/[^\d]+g/,'');
    console.info("Rg number after replace: ",rgNumber);

    //rg expedition state can't be empty;
    const rgNumberString = String(rgNumber)
    if(rgNumberString.trim() == "" || rgNumberString.trim() == null || rgNumberString.trim() == " "){
      console.error("Rg number is empty")
      return { ValidateRgNumberIsEmpty : true };
    }else{
      //Do nothing
    }

    //rg number can't have less then 5 digits or more then 13
    const rgNumberLength:number = String(rgNumber).trim().length
    if(rgNumberLength < 5 || rgNumberLength > 13){
      console.error("Rg number:", rgNumber, " is not valid")
      return { ValidateRgNumberOutput : true };
    }else{
      console.trace("Rg number:", rgNumber, " is valid");
      return null
    }
  };
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
