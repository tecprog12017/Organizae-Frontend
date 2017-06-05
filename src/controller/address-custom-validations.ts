import { AbstractControl, ValidatorFn } from '@angular/forms';

export function ValidateCep (): ValidatorFn{

  return (control: AbstractControl): {[key: string]: any} => {
    var cep = control.value

    const cepWithoutletters = ReplaceNotNumericalDigits(cep);
    if(cepWithoutletters != null){
      cep = cepWithoutletters
      console.info(cep)
    }else{
      return null
    }

    try{
      //cep can't be empty or have letters
      CheckIfAdressInfoIsEmpty(cep)

      //cep need to have eight digitis
      CheckIfCepHasRequiredLenght(cep)

      console.info(cep)

    }catch(error){
      if (error instanceof Error){
        if(error.message == "Address info is empty"){
          return { CepIsEmpty : true }
        }else if(error.message == "Cep does not have eight digits"){
          return { CepDoesNotHaveRequiredLenght : true }
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

export function ValidateNumber(): ValidatorFn {

  return (control: AbstractControl): {[key: string]: any} => {
    var number = control.value;
    console.log(number);

    const numberWithoutletters = ReplaceNotNumericalDigits(number);
    if(numberWithoutletters != null){
      number = numberWithoutletters
      console.info(number)
    }else{
      return null
    }

    try{
      //Number can not me empty
      CheckIfAdressInfoIsEmpty(number)
    }catch(error){
      if(error instanceof Error){
        if(error.message == "Address info is empty"){
          return { NumberIsEmpty : true }
        }else{
          //Do nothing
        }
      }else{
        //Do nothing
      }
    }
  }
}

export function ValidateAdressInformation(): ValidatorFn {

  return (control: AbstractControl): {[key: string]: any} => {
    var addressInformation = control.value;
    console.log(addressInformation);

    const addressInformationWithoutletters = ReplaceSpecialCharacters(addressInformation);
    if(addressInformationWithoutletters != null){
      addressInformation = addressInformationWithoutletters
      console.info(addressInformation)
    }else{
      return null
    }

    try{
      //Address Information can't be empty
      CheckIfAdressInfoIsEmpty(addressInformation)
    }catch(error){
      if(error instanceof Error){
        if(error.message == "Address info is empty"){
          return { AddressInformationIsEmpty : true }
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
function ReplaceSpecialCharacters(addressInfo:string){
  if(addressInfo != null){
    return addressInfo = addressInfo.replace(/[^\w\s]/gi, '')
  }
  //Adress Info has not been registed yet
  else{
    return null
  }
}

function ReplaceNotNumericalDigits(addressInfo:string){
  if(addressInfo != null){
    //remove all non numerical characters of Adress Info to prevent masks
    return addressInfo = addressInfo.replace(/\D/g, '');
  }
  //adressInfo has not been regitered yet
  else{
    return null;
  }
}

function CheckIfAdressInfoIsEmpty(addressInfo:string){
  if(addressInfo.trim() == ""){
    console.error("Address info is empty");
    throw new Error("Address info is empty")
  }
  else{
    console.trace("Address info is not empty");
  }
}

//Check if Cep has 8 digits
function CheckIfCepHasRequiredLenght(cep:string){
  const cepRequiredLenght = 8

  if(cep.length == cepRequiredLenght){
    console.trace("Cep:", cep, " has eight digits");
  }
  else{
    console.error("Cep:", cep, " does not have eight digits");
    throw new RangeError("Cep does not have eight digits")
  }
}
