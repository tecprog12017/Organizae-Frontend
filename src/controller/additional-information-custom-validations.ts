import { AbstractControl, ValidatorFn } from '@angular/forms';
import { Directive, ElementRef, HostListener, Input } from '@angular/core';

//Validation used to not allow letters, special characters and short strings in phone number
export function ValidatePhone (): ValidatorFn {

  return (control: AbstractControl): {[key: string]: any} => {
    var phone = control.value;
    console.info(phone);


    const phoneWithoutletters = ReplaceNotNumericalDigits(phone);
    if(phoneWithoutletters != null){
      phone = phoneWithoutletters
      console.info(phone)
    }else{
      return null
    }

    try{
      //Phone can't be empty
      CheckIfPhoneIsEmpty(phone)

      //phone need to have between 8 and 13 digits
      CheckIfCpfHasRequiredLenght(phone)
    }catch(error){
      if(error instanceof Error){
        if(error.message == "Phone is empty"){
          return { PhoneIsEmpty : true }
        }else if(error.message == "Cpf does not have required lenght"){
          return { PhoneDoesNotHaveRequiredLenght : true }
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

function ReplaceNotNumericalDigits(phone:string){
  if(phone != null){
    //remove all non numerical characters of phone to prevent masks
    return phone = phone.replace(/\D/g, '');
  }
  //cpf has not been regitered yet
  else{
    return null;
  }
}

//Check if phone has between 8 and 13 digitis
function CheckIfCpfHasRequiredLenght(phone:string){
  const minLenghtValue = 8
  const maxLenghtValue = 13

  if(phone.length >= minLenghtValue && phone.length <= maxLenghtValue){
    console.trace("Phone:", phone, " has required lenght");
  }
  else{
    console.error("Phone:", phone, " does not have required lenght");
    throw new RangeError("Cpf does not have required lenght")
  }
}

function CheckIfPhoneIsEmpty(phone:string){
  if(phone.trim() == ""){
    console.error("Phone is empty");
    throw new Error("Phone is empty")
  }
  else{
    console.trace("Phone is not empty");
  }
}
