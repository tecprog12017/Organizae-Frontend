/**
  File:cpf-custom-validations.ts
  Purpose:take care of the validation of user's cpf
  //more Information about his validation at: https://http://www.geradorcpf.com/algoritmo_do_cpf.htm
  License: MIT
*/


import { AbstractControl, ValidatorFn } from '@angular/forms';

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

    try{
      CheckIfCpfIsEmpty(cpf);
      CheckIfCpfHasRequiredLenght(cpf);

      //check if the first digit of cpf is out of leght of is a known invalid number
      CheckIfCpfIsKnown(cpf);

      //check if the first verifying digit of cpf is valid
      ValidatesCpfFirstVerifyingDigit(cpf);
      console.trace("Cpf: ", cpf, " tem o primeiro digito valido");

      //check if the second verifying digit of cpf is valid
      ValidatesCpfSecondVerifyingDigit(cpf);
      console.trace("Cpf: ", cpf, " tem o segundo digito válido");

    }catch(error){
      if(error instanceof Error){
        if(error.message == "Cpf is empty"){
          return { CpfIsEmpty : true };
        }else if(error.message == "Cpf does not have eleven digits"){
          return { CpfDoesNotHaveRequiredLenght : true };
        }else if(error.message == "Cpf first digit is invalid" || error.message == "Cpf second digit is not valid" || error.message == "Cpf is an invalid known number"){
          return { CpfIsInvalid : true };
        }else{
          //Do nothing
        }
      }else{
        //Do nothing
      }
    }
    return null
  }
}

//Check if cpf has eleven digits
function CheckIfCpfHasRequiredLenght(cpf:string){
  const cpfRequiredLenght = 11;   //cpf need to have eleven digits

  if(cpf.length == cpfRequiredLenght){
    console.trace("Cpf:", cpf, " has eleven digits");
  }
  else{
    console.error("Cpf:", cpf, " does not have eleven digits");
    throw new RangeError("Cpf does not have eleven digits")
  }
}

function CheckIfCpfIsEmpty(cpf:string){
  if(cpf.trim() == ""){
    console.error("Cpf is empty");
    throw new Error("Cpf is empty")
  }
  else{
    console.trace("Cpf is not empty");
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
       console.error("Cpf: ", cpf, " is an invalid known number");
       throw Error("Cpf is an invalid known number");
     }
  else{
    console.trace("Cpf:", cpf, " isn't a invalid known number");
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
      console.log(firstDigitVerifier);
      console.log(number);
      throw new Error("Cpf first digit is invalid");
    }else{
      //DO NOTHING
    }
}

function ValidatesCpfSecondVerifyingDigit(cpf:string){
  var adder = 0;
  var secondDigitVerifier = 0;
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
    throw new Error("Cpf second digit is not valid");
  }else{
    return true;
  }

}
