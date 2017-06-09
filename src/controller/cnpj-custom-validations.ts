import { AbstractControl, ValidatorFn } from '@angular/forms';

// Validates used to only allow cnpj according to cnpj algorithm
//-> More information about this algorithm: https://imasters.com.br/artigo/2451/javascript/algoritmo-do-cnpj/?trace=1519021197&source=single
export function ValidatesCnpj(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    var cnpj = control.value;
    console.info(cnpj);

    const cnpjWithoutletters = ReplaceNotNumericalDigits(cnpj);
    if(cnpjWithoutletters != null){
      cnpj = cnpjWithoutletters
      console.info(cnpj)
    } else{
      return null
    }

    try {
      CheckIfCnpjIsEmpty(cnpj);
      CheckIfCnpjHasRequiredLenght(cnpj);

      // check if the first digit of cnpj is out of leght of is a known invalid number
      CheckIfCnpjIsKnown(cnpj);

      // check if the first verifying digit of cnpj is valid
      ValidatesCnpjFirstVerifyingDigit(cnpj);

      // check if the second verifying digit of cnpj is valid
      ValidatesCnpjSecondVerifyingDigit(cnpj);
    } catch(error) {
      if(error instanceof Error) {
        if(error.message == "Cnpj is empty") {
          return { CnpjIsEmpty : true };
        }else if(error.message == "Cnpj does not have fourteen digits") {
          return { CnpjDoesNotHaveRequiredLenght : true };
        }else if(error.message == "Cnpj first digit is invalid" || error.message == "Cnpj second digit is invalid" || error.message == "Cnpj is an invalid known number"){
          return { CnpjIsInvalid : true };
        } else {
          //Do nothing
        }
      } else{
        //Do nothing
      }
    }
    return null
  }
}


function ReplaceNotNumericalDigits(cnpj:string){
  if(cnpj != null){
    //remove all non numerical characters of cnpj to prevent masks
    return cnpj = cnpj.replace(/[^\d]+/g,'');
  }
  //cnpj has not been regitered yet
  else{
    return null;
  }
}

function CheckIfCnpjIsEmpty(cnpj:string){
  if(cnpj.trim() != ""){
    console.trace("Cnpj is not empty");
  }
  else{
    console.error("Cnpj is empty");
    throw new Error("Cnpj is empty")
  }
}

//Check if cnpj has fourteen digits
function CheckIfCnpjHasRequiredLenght(cnpj:string){
  const cnpjRequiredLenght = 14;   //cnpj need to have fourteen digits

  if(cnpj.length == cnpjRequiredLenght){
    console.trace("Cnpj:", cnpj, " has fourteen digits");
  }
  else{
    console.error("Cnpj:", cnpj, " does not have fourteen digits");
    throw new RangeError("Cnpj does not have fourteen digits")
  }
}

//check if cnpj is a known invalid number
function CheckIfCnpjIsKnown(cnpj:string){
  var cnpjIsWrong = (cnpj == "00000000000" || cnpj == "11111111111" ||
                     cnpj == "22222222222" || cnpj == "33333333333" ||
                     cnpj == "44444444444" || cnpj == "55555555555" ||
                     cnpj == "66666666666" || cnpj == "77777777777" ||
                     cnpj == "88888888888" || cnpj == "99999999999");

  if(!cnpjIsWrong){
    console.trace("Cnpj:", cnpj, " isn't a invalid known number");
  } else{
    console.error("Cnpj: ", cnpj, " is an invalid known number");
    throw Error("Cnpj is an invalid known number");
  }
}

function ValidatesCnpjFirstVerifyingDigit(cnpj:string){
  var adder = 0;
  var firstDigitVerifier = 0;
  const lastNumericalDigit = 12;

  var value_defined = 5;
  //Loop to go through numbers zero to eleven
  for(var number = 0; number < lastNumericalDigit; number++){

    //Transforms the digit(number) of cnpj to a integer and append the multiply on the adder
    adder += parseInt(cnpj.charAt(number)) * value_defined;
    value_defined--;

    if (value_defined < 2) {
      value_defined = 9;
    } else {
      // do nothing
    }
  }
    var rest_division = adder % 11;
    if (rest_division < 2) {
      firstDigitVerifier = 0;
    } else {
      firstDigitVerifier = 11 - rest_division;
    }

    // check if the verifying digit is equal to the the twelfth digit
    if(firstDigitVerifier == parseInt(cnpj.charAt(lastNumericalDigit))){
      console.trace(firstDigitVerifier);
      console.trace("Cnpj first digit is valid");
    }else{

      throw new Error("Cnpj first digit is invalid");
    }
}

function ValidatesCnpjSecondVerifyingDigit(cnpj:string){
  var adder = 0;
  var secondDigitVerifier = 0;
  const lastNumericalDigit = 13;

  var value_defined = 6;
  //Loop to go through numbers zero to twelve
  for(var number = 0; number < lastNumericalDigit; number++){

    //Transforms the digit(number) of cnpj to a integer and append the multiply on the adder
    adder += parseInt(cnpj.charAt(number)) * value_defined;
    value_defined--;

    if (value_defined < 2) {
      value_defined = 9;
    } else {
      // do nothing
    }
  }
    var rest_division = adder % 11;
    if (rest_division < 2) {
      secondDigitVerifier = 0;
    } else {
      secondDigitVerifier = 11 - rest_division;
    }

    // check if the verifying digit is equal to the the thirteenth digit
    if(secondDigitVerifier == parseInt(cnpj.charAt(lastNumericalDigit))){
      console.trace(secondDigitVerifier);
      console.trace("Cnpj second digit is valid");
    }else{
      throw new Error("Cnpj second digit is invalid");
    }
}
