import { AbstractControl, ValidatorFn } from '@angular/forms';

var assert = require('assert');

export function ValidateRgNumber (): ValidatorFn {

  return (control: AbstractControl): {[key: string]: any} => {
    var rgNumber = control.value;

    const rgNumberWithoutletters = ReplaceNotNumericalDigits(rgNumber);
    if(rgNumberWithoutletters != null){
      rgNumber = rgNumberWithoutletters
      console.info(rgNumber)
    }else{
      return null
    }

    try{
      //Rg number can't be empty or have letters
      CheckIfRgNumberIsEmpty(rgNumber)

      //Rg number need to have between 5 and 13 digits
      CheckIfCpfHasRequiredLenght(rgNumber)
    }catch(error){
      if (error instanceof Error){
        if(error.message == "Rg number is empty"){
          return { RgNumberIsEmpty : true };
        }else if(error.message == "Rg number does not have required lenght"){
          return { RgNumberDoesNotHaveRequiredLenght : true }
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

function ReplaceNotNumericalDigits(rgNumber:string){
  if(rgNumber != null){
    //remove all non numerical characters of rg number to prevent masks
    return rgNumber = rgNumber.replace(/\D/g, '');
  }
  //Rg number has not been regitered yet
  else{
    return null;
  }
}

function CheckIfRgNumberIsEmpty(rgNumber:string){
  assert(rgNUmber != null, "rg Number can not be null")
  if(rgNumber.trim() == ""){
    console.error("Rg number is empty");
    throw new Error("Rg number is empty")
  }
  else{
    console.trace("Rg number is not empty");
  }
}

//Check RgNumber cpf between 5 and  13  digits
function CheckIfCpfHasRequiredLenght(rgNumber:string){
  assert(rgNUmber != null, "rg Number can not be null")
  assert(rgNUmber != "", "rg Number can not be empty")
  const minDigitsValue = 5
  const maxDigitsValue = 13;

  if(rgNumber.length >= minDigitsValue && rgNumber.length <= maxDigitsValue){
    console.trace("Rg number:", rgNumber, " has between required lenght");
  }
  else{
    console.error("Rg number:", rgNumber, " does not required lenght");
    throw new RangeError("Rg number does not have required lenght")
  }
}
