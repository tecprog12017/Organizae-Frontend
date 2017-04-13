import { FormGroup } from '@angular/forms';

export class UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  password: string;

  constructor( signUpForm: FormGroup) {
    this.firstName = signUpForm.get('firstName').value;
    this.lastName = signUpForm.get('lastName').value;
    this.email = signUpForm.get('email').value;
    this.password = signUpForm.get('password').value;
  }
}

export class Gender {
  genderIdentity: string;
  pronoun: string;

  constructor( editGenderForm: FormGroup) {
    console.log(editGenderForm.get('genderIdentity'));
    this.genderIdentity = editGenderForm.get('genderIdentity').value;
    this.pronoun = editGenderForm.get('pronoun').value;
  }
}

  export class Cpf {
    cpf: string;

    constructor( editCpfForm: FormGroup) {
      this.cpf = editCpfForm.get('cpf').value;
    }
}

export class Rg {
  rgNumber: string;
  rgExpeditionState: string;

  constructor( editRgForm: FormGroup) {
    this.rgNumber = editRgForm.get('rgNumber').value;
    this.rgExpeditionState = editRgForm.get('rgExpeditionState').value;
  }
}


export class Address {

  cep: number
  city: string
  state: string
  neighbourhood: string
  number: number
  complement: string

  constructor( editAddressForm: FormGroup) {

    this.cep = editAddressForm.get('cep').value;
    this.city = editAddressForm.get('city').value;
    this.state = editAddressForm.get('state').value;
    this.neighbourhood = editAddressForm.get('neighbourhood').value;
    this.number = editAddressForm.get('number').value;
    this.complement = editAddressForm.get('complement').value;

  }
}
