import { AbstractControl, ValidatorFn } from '@angular/forms';
import { Directive, ElementRef, HostListener, Input } from '@angular/core';

//Validates used to only allow cpf according to cpf algorithm
//-> More information about this algorithm: https://http://www.geradorcpf.com/algoritmo_do_cpf.htm
export function ValidatesCpf(): ValidatorFn {

  return (control: AbstractControl): {[key: string]: any} => {
    var cpf = control.value;
    console.info(cpf);

    const cpfWithoutletters = ReplaceNotNumericalDigits(cpf);
    if(cpfWithoutletters != null){
      cpf = cpfWithoutletters
      console.info(cpf)
    }else{
      return null
    }

    const cpfIsEmpty = CheckIfCpfIsEmpty(cpf);
    if(cpfIsEmpty){
      return { CpfIsEmpty : true };
    }else{
      //Do nothing
    }

    const cpfHasElevenDigits = CheckIfCpfHasRequiredLenght(cpf);
    if(!cpfHasElevenDigits){
      return { CpfDontHaveRequiredLenght : true };
    }else{
      //Do nothing
    }

    //check if the first digit of cpf is out of leght of is a known invalid number
    const cpfIsKnown = CheckIfCpfIsKnown(cpf);
    if(cpfIsKnown){
      return { ValidateCpfOutput : true };
    }else{
      //Do nothing
    }

    const cpfFirstVerifyingDigitIsValid = ValidatesCpfFirstVerifyingDigit(cpf);
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

//Check if cpf has eleven digits
function CheckIfCpfHasRequiredLenght(cpf:string){
  //cpf need to have exactly eleven digits
  const cpfRequiredLenght = 11;

  if(cpf.length == cpfRequiredLenght){
    console.trace("Cpf:", cpf, " has eleven digits");
    return true;
  }
  else{
    console.error("Cpf:", cpf, " does not have eleven digits");
    return false;
  }
}

function CheckIfCpfIsEmpty(cpf:string){
  if(cpf.trim() == ""){
    console.error("Cpf is empty");
    return true;
  }
  else{
    console.trace("Cpf is not empty");
    return false;
  }
}

function ReplaceNotNumericalDigits(cpf:string){
  if(cpf != null){
    //remove all non numerical characters of cpf to prevent masks
    return cpf = cpf.replace(/\D/g, '');
  }
  //cpf has not been regitered yet
  else{
    return null;
  }
}

function CheckIfCpfIsKnown(cpf:string){
  //check if cpf is a known invalid number
  if(cpf == "00000000000" || cpf == "11111111111" || cpf == "22222222222" || cpf == "33333333333" ||
     cpf == "44444444444" || cpf == "55555555555" || cpf == "66666666666" || cpf == "77777777777" ||
     cpf == "88888888888" || cpf == "99999999999"){
       console.error("Cpf: ", cpf, " is a invalid known number")
       return true;
     }
  else{
    console.trace("Cpf:", cpf, " isn't a invalid known number")
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
